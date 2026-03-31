// src/hooks/useItemPriority.js
import { useState } from 'react';

function useItemPriority() {
  const [priorityItems, setPriorityItems] = useState([]);

  const addPriorityItem = (item) => {
    setPriorityItems(prev => [...prev, item]);
  };

  const removePriorityItem = (index) => {
    setPriorityItems(prev => prev.filter((_, i) => i !== index));
  };

  return { priorityItems, addPriorityItem, removePriorityItem };
}

export default useItemPriority;