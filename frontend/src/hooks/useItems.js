// src/hooks/useItems.js
import { useState, useEffect } from 'react';

function useItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return { items };
}

export default useItems;