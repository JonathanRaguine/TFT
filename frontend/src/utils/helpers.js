// src/utils/helpers.js

// Filters champions by cost
export function filterByCost(champions, costFilter) {
  if (costFilter === 'all') return champions;
  return champions.filter(c => c.cost === Number(costFilter));
}

// Filters champions by trait
export function filterByTrait(champions, traitFilter) {
  if (traitFilter === 'all') return champions;
  return champions.filter(c => c.traits && c.traits.some(t => t.name === traitFilter));
}

//color code champions on hextable based on cost
export function getCostColor(cost) {
  switch (cost) {
    case 1: return '#aaaaac';
    case 2: return '#15b96d';
    case 3: return '#4db2e9';
    case 4: return '#c80fae';
    case 5: return '#e7b12f';
    default: return '#aaaaac';
  }
}

// Counts how many of each trait your team has
export function countTraits(team) {
  const traitCounts = {};
  
  Object.values(team).forEach(champion => {
    champion.traits.forEach(trait => {
      traitCounts[trait.name] = (traitCounts[trait.name] || 0) + 1;
    });
});

  
  return traitCounts;
}