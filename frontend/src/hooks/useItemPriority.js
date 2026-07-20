// src/hooks/useItemPriority.js
import { useState } from 'react';

// A simple ordered list of items the user is prioritizing this session. Kept as
// plain in-memory state (no backend) on purpose — unlike saved teams, this is a
// throwaway scratchpad that's fine to lose on refresh. An ordered array because
// the order itself is the meaning ("build this first, then this").
function useItemPriority() {
  const [priorityItems, setPriorityItems] = useState([]);

  const addPriorityItem = (item) => {
    setPriorityItems(prev => [...prev, item]);
  };

  // Remove by list position, not item id, so duplicates of the same item can be
  // added and removed independently.
  const removePriorityItem = (index) => {
    setPriorityItems(prev => prev.filter((_, i) => i !== index));
  };

  return { priorityItems, addPriorityItem, removePriorityItem };
}

export default useItemPriority;