// src/hooks/useChampions.js

import { useState, useEffect } from 'react';

function useChampions() {
  // Champions and traits are reference data seeded in the DB, so we fetch them
  // from the API once rather than hardcoding them in the frontend — a reseed for
  // a new set updates the app with no code change here.
  const [champions, setChampions] = useState([]);
  const [traits, setTraits] = useState([]);

  // Empty dependency array [] = run once on mount. Without it this would refetch
  // on every render and loop forever.
  useEffect(() => {
    fetch('http://localhost:8000/champions')
      .then(response => response.json())
      .then(data => setChampions(data));
  }, []);

  // Separate effect for traits so one fetch failing doesn't block the other.
  useEffect(() => {
    fetch('http://localhost:8000/traits')
      .then(response => response.json())
      .then(data => setTraits(data));
  }, []);

  // Return the data so components can use it
  return { champions, traits };
}

export default useChampions;