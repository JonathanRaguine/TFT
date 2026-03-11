// src/hooks/useChampions.js

import { useState, useEffect } from 'react';

function useChampions() {
  // State for our data
  const [champions, setChampions] = useState([]);
  const [traits, setTraits] = useState([]);

  // Fetch champions when hook is first used
  useEffect(() => {
    fetch('http://localhost:8000/champions')
      .then(response => response.json())
      .then(data => setChampions(data));
  }, []);

  // Fetch traits when hook is first used
  useEffect(() => {
    fetch('http://localhost:8000/traits')
      .then(response => response.json())
      .then(data => setTraits(data));
  }, []);

  // Return the data so components can use it
  return { champions, traits };
}

export default useChampions;