import React from "react";

function ChampionTable({ displayedChampions, addToTeam, traits, onCostChange, onTraitChange }) {

  const handleDragStart = (e, champion) => {
    e.dataTransfer.setData('champion', JSON.stringify(champion)); // when drag starts store champion data
  };

  return (
    <div>
      {/* Filter bar pinned at top */}
      <div style={{
        display: 'flex',
        gap: '5px',
        padding: '8px',
        backgroundColor: '#0e1e36',
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}>
        <select 
          onChange={c => onCostChange(c.target.value)}
          style={{
            backgroundColor: '#1a2942',
            color: 'white',
            border: '1px solid #2a3f5f',
            borderRadius: '4px',
            padding: '4px 8px',
          }}
        >
          <option value="all">All Costs</option>
          <option value="1">1 Cost</option>
          <option value="2">2 Cost</option>
          <option value="3">3 Cost</option>
          <option value="4">4 Cost</option>
          <option value="5">5 Cost</option>
          <option value="7">7 Cost</option>
        </select>

        <select 
          onChange={t => onTraitChange(t.target.value)}
          style={{
            backgroundColor: '#1a2942',
            color: 'white',
            border: '1px solid #2a3f5f',
            borderRadius: '4px',
            padding: '4px 8px',
          }}
        >
          <option value="all">All Traits</option>
          {traits.map(trait => (
            <option key={trait.id} value={trait.name}>{trait.name}</option>
          ))}
        </select>
      </div>
      {[1, 2, 3, 4, 5, 7].map(cost => {
        const championsAtCost = displayedChampions.filter(c => c.cost === cost);
        const regular = championsAtCost.filter(c => !c.is_unlockable);
        const unlockable = championsAtCost.filter(c => c.is_unlockable);
        if (championsAtCost.length === 0) return null;
        return (
          <div key={cost} style={{
            backgroundColor: cost === 1 ? '#333741E6' : 
                             cost === 2 ? '#1a3d3dE6' : 
                             cost === 3 ? '#1a3351E6' :
                             cost === 4 ? '#321244E6' :
                             '#38322aE6',
            width: '100%', 
            padding: '10px',
            marginBottom: '10px'
          }}>
            <div>
              {regular.map(champion => (
                <img 
                  key={champion.id}
                  src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/tft16_${champion.image_id.toLowerCase()}_square.tft_set16.png`}
                  alt={champion.name}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e,champion)}
                  style={{
                    width: '48px', 
                    height: '48px',
                    margin: '2px',
                    border: '2px solid', 
                    borderColor: cost === 1 ? '#aaaaac' : 
                                 cost === 2 ? '#15b96d' : 
                                 cost === 3 ? '#4db2e9' :
                                 cost === 4 ? '#c80fae' :
                                 '#e7b12f',
                  }}
                />
              ))}
            </div>
            <div>
              {unlockable.map(champion => (
                <img 
                  key={champion.id}
                  src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/tft16_${champion.image_id.toLowerCase()}_square.tft_set16.png`}
                  alt={champion.name}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e,champion)}
                  style={{
                    width: '48px', 
                    height: '48px', 
                    margin: '2px', 
                    border: '2px solid', 
                    borderColor: cost === 1 ? '#aaaaac' : 
                                 cost === 2 ? '#15b96d' : 
                                 cost === 3 ? '#4db2e9' :
                                 cost === 4 ? '#c80fae' :
                                 '#e7b12f',
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChampionTable;