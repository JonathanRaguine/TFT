// src/components/Filters.js
// NOTE: currently unused — nothing imports this component. The cost/trait
// dropdowns that are actually on screen live inline at the top of ChampionTable.
// Kept as a standalone version of those filters; delete it or switch
// ChampionTable to use it to remove the duplication.
function Filters({ traits, onCostChange, onTraitChange }) {
  return (
    <div className="filters">
      <select onChange={e => onCostChange(e.target.value)}>
        <option value="all">All Costs</option>
        <option value="1">1 Cost</option>
        <option value="2">2 Cost</option>
        <option value="3">3 Cost</option>
        <option value="4">4 Cost</option>
        <option value="5">5 Cost</option>
        <option value="7">7 Cost</option>
      </select>

      <select onChange={e => onTraitChange(e.target.value)}>
        <option value="all">All Traits</option>
        {traits.map(trait => (
          <option key={trait.id} value={trait.name}>
            {trait.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;