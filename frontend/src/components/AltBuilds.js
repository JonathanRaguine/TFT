// src/components/AltBuilds.js
import React from 'react';
function AltBuilds({ altBuilds, addAltBuild, addItemToAltBuild, removeAltBuild }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDropChampion = (e) => {
    e.preventDefault();
    const championData = e.dataTransfer.getData('champion');
    if (!championData) return;
    const champion = JSON.parse(championData);
    addAltBuild(champion);
  };
  const handleDropItem = (e, buildIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const itemData = e.dataTransfer.getData('item');
    if (!itemData) return;
    const item = JSON.parse(itemData);
    addItemToAltBuild(buildIndex, item);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDropChampion}
      style={{
        backgroundColor: '#1a2942',
        border: '1px solid #2a3f5f',
        borderRadius: '5px',
        padding: '10px',
        minWidth: '150px',
        minHeight: '80px',
        overflowY: 'auto',
      }}
    >
      <h4 style={{ color: '#c9aa71', margin: '0 0 8px 0', fontSize: '12px', textAlign: 'center' }}>
        Alt Builds
      </h4>
    
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '5px',
      }}>
        {altBuilds.map((build, buildIndex) => (
          <div
            key={buildIndex}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropItem(e, buildIndex)}
            onClick={() => removeAltBuild(buildIndex)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '5px',
              backgroundColor: '#0e1e36',
            }}
            title="Click to remove"
          >
            {/* Champion portrait wrapper with hex clip */}
            <div style={{
              width: '50px',
              height: '50px',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              overflow: 'hidden',
            }}>
              <img
                src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/tft16_${build.champion.image_id.toLowerCase()}_square.tft_set16.png`}
                alt={build.champion.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <span style={{ color: 'white', fontSize: '10px', marginTop: '2px' }}>
              {build.champion.name}
            </span>
            <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
              {build.items.map((item, itemIndex) => (
                <img
                  key={itemIndex}
                  src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/tft-item/${item.image_id}`}
                  alt={item.name}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '3px',
                    border: '1px solid #9b59b6',
                  }}
                />
              ))}
              {Array.from({ length: 3 - build.items.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '3px',
                    border: '1px solid #2a3f5f',
                    backgroundColor: '#051120',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {altBuilds.length === 0 && (
        <p style={{ color: '#555', fontSize: '10px', margin: 0, textAlign: 'center' }}>
          Drag champions here
        </p>
      )}
    </div>
  );
}
export default AltBuilds;