// src/components/ItemTable.js
import React from 'react';

function ItemTable({ items }) {
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  };

  const componentItems = items.filter(item => item.is_component);
  const combinedItems = items.filter(item => !item.is_component);

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {/* Component Items */}
      <div style={{
        backgroundColor: '#1a3351E6',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px'
      }}>
        <h3 style={{ color: '#c9aa71', margin: '0 0 8px 0', fontSize: '12px' }}>Components</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {componentItems.map(item => (
            <img
              key={item.id}
              src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/tft-item/${item.image_id}`}
              alt={item.name}
              title={item.name}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item)}
              style={{
                width: '40px',
                height: '40px',
                cursor: 'grab',
                border: '2px solid #c9aa71',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Combined Items */}
      <div style={{
        backgroundColor: '#321244E6',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <h3 style={{ color: '#c9aa71', margin: '0 0 8px 0', fontSize: '12px' }}>Combined Items</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {combinedItems.map(item => (
            <img
              key={item.id}
              src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/tft-item/${item.image_id}`}
              alt={item.name}
              title={item.name}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item)}
              style={{
                width: '40px',
                height: '40px',
                cursor: 'grab',
                border: '2px solid #9b59b6',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemTable;