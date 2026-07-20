// src/hooks/useSavedTeams.js
import { useState, useEffect } from 'react';

// Hardcoded to match the other hooks (useChampions/useItems). When we deploy to
// AWS this should move to an env var (REACT_APP_API_URL) since the backend won't
// live on localhost anymore.
const API = 'http://localhost:8000';

// We need *some* identity to scope teams per user, but there's no login yet.
// A localStorage id gives each browser a stable owner key so teams survive a
// refresh. The tradeoff: it's per-browser, so a different browser/device (or
// cleared storage) sees an empty list. Once Cognito is added, swap this for the
// authenticated user's `sub` and per-device becomes true per-user.
function getUserId() {
  let id = localStorage.getItem('tft_user_id');
  if (!id) {
    // randomUUID isn't in older browsers, so fall back to a good-enough unique id.
    id = (window.crypto && window.crypto.randomUUID)
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
    localStorage.setItem('tft_user_id', id);
  }
  return id;
}

function useSavedTeams() {
  const [savedTeams, setSavedTeams] = useState([]);
  const userId = getUserId();

  // The whole point of the backend: rehydrate the list from the DB on load so a
  // refresh doesn't wipe it (the original problem with the in-memory version).
  useEffect(() => {
    fetch(`${API}/saved-teams?user_id=${encodeURIComponent(userId)}`)
      .then(res => res.json())
      .then(data => setSavedTeams(data))
      .catch(err => console.error('Failed to load saved teams:', err));
  }, [userId]);

  const addSavedTeam = (name, board) => {
    fetch(`${API}/saved-teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, name, board }),
    })
      .then(res => res.json())
      // Append the *server's* version (it carries the DB id) rather than the
      // local object, so later deletes can reference that id.
      .then(created => setSavedTeams(prev => [...prev, created]))
      .catch(err => console.error('Failed to save team:', err));
  };

  const removeSavedTeam = (id) => {
    fetch(`${API}/saved-teams/${id}?user_id=${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    })
      // Only drop it from local state after the server confirms, so the UI can't
      // fall out of sync with the DB if the request fails.
      .then(() => setSavedTeams(prev => prev.filter(t => t.id !== id)))
      .catch(err => console.error('Failed to remove team:', err));
  };

  return { savedTeams, addSavedTeam, removeSavedTeam };
}

export default useSavedTeams;
