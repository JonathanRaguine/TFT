// src/hooks/useAltBuilds.js
import { useState } from 'react';

// A side list of "champion + item ideas" that aren't on the board — a scratchpad
// for alternate itemizations. Like item priority, it's intentionally in-memory
// only (throwaway, not worth persisting). Each entry pairs one champion with its
// own items array, independent of the board.
function useAltBuilds() {
  const [altBuilds, setAltBuilds] = useState([]);

  const addAltBuild = (champion) => {
    setAltBuilds(prev => [...prev, { champion, items: [] }]);
  };

  const addItemToAltBuild = (buildIndex, item) => {
    // map to a new array and only rebuild the targeted entry, leaving the others
    // as the same references — keeps updates immutable without copying everything.
    setAltBuilds(prev => prev.map((build, i) => {
      if (i !== buildIndex) return build;
      if (build.items.length >= 6) return build; // cap items per alt build
      return { ...build, items: [...build.items, item] };
    }));
  };

  const removeAltBuild = (index) => {
    setAltBuilds(prev => prev.filter((_, i) => i !== index));
  };

  return { altBuilds, addAltBuild, addItemToAltBuild, removeAltBuild };
}

export default useAltBuilds;