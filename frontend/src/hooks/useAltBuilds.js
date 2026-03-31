// src/hooks/useAltBuilds.js
import { useState } from 'react';

function useAltBuilds() {
  const [altBuilds, setAltBuilds] = useState([]);

  const addAltBuild = (champion) => {
    setAltBuilds(prev => [...prev, { champion, items: [] }]);
  };

  const addItemToAltBuild = (buildIndex, item) => {
    setAltBuilds(prev => prev.map((build, i) => {
      if (i !== buildIndex) return build;
      if (build.items.length >= 6) return build;
      return { ...build, items: [...build.items, item] };
    }));
  };

  const removeAltBuild = (index) => {
    setAltBuilds(prev => prev.filter((_, i) => i !== index));
  };

  return { altBuilds, addAltBuild, addItemToAltBuild, removeAltBuild };
}

export default useAltBuilds;