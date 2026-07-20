import React from 'react';

function ItemTable({ items }) {
  // Tag the drag payload with the 'item' key. The board and champion drop zones
  // key off this to route it to "attach item" instead of "place champion".
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  };

  // Split into the two TFT item classes so they can be shown as separate,
  // labeled sections: components (the basic building blocks) vs combined
  // (two components fused). The is_component flag comes from the seed data.
  const componentItems = items.filter(item => item.is_component);
  const combinedItems = items.filter(item => !item.is_component);

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
              src={`https://ddragon.leagueoflegends.com/cdn/16.10.1/img/tft-item/${item.image_id}`}
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
              src={`https://ddragon.leagueoflegends.com/cdn/16.10.1/img/tft-item/${item.image_id}`}
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