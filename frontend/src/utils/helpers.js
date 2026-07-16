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