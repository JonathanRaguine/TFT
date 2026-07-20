// src/utils/helpers.js
// Pure helpers (no state, no side effects) kept out of the components so the
// same logic can be reused and tested in isolation.

// Filters champions by cost. 'all' is the sentinel for "no filter". The Number()
// cast matters because the value comes from a <select> as a string ("3"), but
// champion.cost is a real number — without it the === would never match.
export function filterByCost(champions, costFilter) {
  if (costFilter === 'all') return champions;
  return champions.filter(c => c.cost === Number(costFilter));
}

// Filters champions by trait. A champion has several traits, so we keep it if
// ANY of them matches. The `c.traits &&` guard avoids crashing on a champion
// whose traits haven't loaded/populated.
export function filterByTrait(champions, traitFilter) {
  if (traitFilter === 'all') return champions;
  return champions.filter(c => c.traits && c.traits.some(t => t.name === traitFilter));
}

// Single source of truth for the cost-tier colors, shared by the champion table
// and the saved-teams cards so tiers look identical everywhere.
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