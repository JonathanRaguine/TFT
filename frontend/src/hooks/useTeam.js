// src/hooks/useTeam.js

import { useState } from 'react';

function useTeam() {
  // The board is stored as an object keyed by hex position ("A1", "B4", ...)
  // rather than a flat array, because position IS the identity of a slot: it
  // makes "what's on this hex?" a direct lookup and makes saving/reloading a
  // team preserve exact placement for free.
  const [team, setTeam] = useState({});

  const addToTeam = (champion, position) => {
    // Guard rails that mirror TFT's rules so the board can't reach an illegal state.
    if (Object.keys(team).length >= 10) return; // max 10 champions
    if (Object.values(team).find(c => c.id === champion.id)) return; // no duplicates
    if (team[position]) return; // hex already occupied
    // Spread into a new object instead of mutating: React only re-renders when
    // the state reference changes, so mutating the existing object wouldn't update the UI.
    setTeam({ ...team, [position]: champion });
  };

  const removeFromTeam = (position) => {
    const newTeam = { ...team };
    delete newTeam[position];
    setTeam(newTeam);
  };

  // Handles dragging a champion already on the board to another hex. If the
  // target hex is occupied the two champions trade places (a swap) rather than
  // one overwriting the other, so no champion silently disappears.
  const swapOnBoard = (champion, origPosition, toPosition) => {
    setTeam(currentTeam => {
      const newTeam = { ...currentTeam };
      const championAtTarget = currentTeam[toPosition];

      // remove from original position
      if (origPosition) {
        delete newTeam[origPosition];
      }

      // if swapping, move target champion to original position
      if (championAtTarget && origPosition) {
        newTeam[origPosition] = championAtTarget;
      }

      // place dragged champion onto new position
      newTeam[toPosition] = champion;
      return newTeam;
    });
  };

  const addItemToChampion = (position,item) => {
    // Uses the updater form (prev => ...) so it always builds on the latest
    // state, even if several drops land in quick succession.
    setTeam(currentTeam => {
      const champion = currentTeam[position];
      if (!champion) return currentTeam;
      const currentItems = champion.items || [];
      if(currentItems.length >= 3) return currentTeam; //max 3 items per champion
      // Rebuild the champion as a new object (new items array too) rather than
      // pushing into the existing one — same immutability reason as above, and
      // it keeps any earlier saved snapshot of this champion untouched.
      return{
        ...currentTeam, [position]: {...champion, items: [...currentItems, item]}
      };
    });
  }

  // Replaces the whole board with a saved snapshot (used when clicking a saved
  // team). It's a full replace, not a merge, so loading a team gives you exactly
  // that team rather than mixing it with whatever was already placed.
  const loadTeam = (savedTeam) => {
    setTeam({ ...savedTeam });
  };

  // Return everything components need
  return { team, addToTeam, removeFromTeam, swapOnBoard, addItemToChampion, loadTeam};
}

export default useTeam;