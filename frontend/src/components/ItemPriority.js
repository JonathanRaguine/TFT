// src/components/ItemPriority.js
import React from 'react';

function ItemPriority({ priorityItems, addPriorityItem, removePriorityItem }) {

  const handleDragOver = (e) => {
    e.preventDefault(); // allows dropping
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData('item'); // grab the item data from drag
    if (!itemData) return; // if nothing was dragged, do nothing
    const item = JSON.parse(itemData);
    addPriorityItem(item);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        backgroundColor: '#1a2942',
        border: '1px solid #2a3f5f',
        borderRadius: '5px',
        padding: '10px',
        minWidth: '150px',
        minHeight: '80px',
      }}
    >
      <h4 style={{ color: '#c9aa71', margin: '0 0 8px 0', fontSize: '12px', textAlign: 'center' }}>
        Item Priority
      </h4>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2px', justifyContent: 'center' }}>
        {priorityItems.map((item, index) => (
          <React.Fragment key={`${item.id}-${index}`}>
            {/* Arrow between items (skip before the first one) */}
            {index > 0 && (
              <span style={{ color: '#c9aa71', fontSize: '10px', margin: '0 2px' }}>▶</span>
            )}
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/tft-item/${item.image_id}`}
              alt={item.name}
              title={`${item.name} (click to remove)`}
              onClick={() => removePriorityItem(index)}
              style={{
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                border: '2px solid #9b59b6',
                borderRadius: '4px',
              }}
            />
          </React.Fragment>
        ))}
        {priorityItems.length === 0 && (
          <p style={{ color: '#555', fontSize: '10px', margin: 0 }}>Drag items here</p>
        )}
      </div>
    </div>
  );
}

export default ItemPriority;