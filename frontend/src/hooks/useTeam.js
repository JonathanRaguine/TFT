// src/hooks/useTeam.js

import { useState } from 'react';

function useTeam() {
  const [team, setTeam] = useState({});

  const addToTeam = (champion, position) => {
    if (Object.keys(team).length >= 10) return; // max 10 champions
    if (Object.values(team).find(c => c.id === champion.id)) return; // no duplicates
    if (team[position]) return; // hex already occupied
    setTeam({ ...team, [position]: champion });
  };

  const removeFromTeam = (position) => {
    const newTeam = { ...team };
    delete newTeam[position];
    setTeam(newTeam);
  };

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
    setTeam(currentTeam => {
      const champion = currentTeam[position];
      if (!champion) return currentTeam;
      const currentItems = champion.items || [];
      if(currentItems.length >= 3) return currentTeam; //max 3 items per champion
      return{
        ...currentTeam, [position]: {...champion, items: [...currentItems, item]}
      };
    });
  }

  // Return everything components need
  return { team, addToTeam, removeFromTeam, swapOnBoard, addItemToChampion};
}

export default useTeam;