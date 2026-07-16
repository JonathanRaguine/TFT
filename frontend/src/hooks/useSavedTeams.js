// src/hooks/useSavedTeams.js
import { useState } from 'react';

function useSavedTeams() {
  const [savedTeams, setSavedTeams] = useState([]);

  const addSavedTeam = (name, champions) => {
    setSavedTeams(prev => [...prev, { name, champions }]);
  };

  const removeSavedTeam = (index) => {
    setSavedTeams(prev => prev.filter((_, i) => i !== index));
  };

  return { savedTeams, addSavedTeam, removeSavedTeam };
}

export default useSavedTeams;
