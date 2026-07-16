// src/hooks/useSavedTeams.js
import { useState, useEffect } from 'react';

const API = 'http://localhost:8000';

// Stable anonymous id per browser until real auth (Cognito) exists.
// Later this is replaced by the authenticated user's Cognito `sub`.
function getUserId() {
  let id = localStorage.getItem('tft_user_id');
  if (!id) {
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

  // Load this user's saved teams on mount
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
      .then(created => setSavedTeams(prev => [...prev, created]))
      .catch(err => console.error('Failed to save team:', err));
  };

  const removeSavedTeam = (id) => {
    fetch(`${API}/saved-teams/${id}?user_id=${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    })
      .then(() => setSavedTeams(prev => prev.filter(t => t.id !== id)))
      .catch(err => console.error('Failed to remove team:', err));
  };

  return { savedTeams, addSavedTeam, removeSavedTeam };
}

export default useSavedTeams;
