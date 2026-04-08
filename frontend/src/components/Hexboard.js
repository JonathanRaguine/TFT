import React from "react";

function HexBoard({team, addToTeam, removeFromTeam, swapOnBoard, addItemToChampion}) {
  const hexWidth = 80;
  const hexCount = 7;
  const hexHeight = hexWidth * 1.15;
  const hexMargin = hexWidth * 0.04;
  const rowOffset = (hexWidth / 2) + hexMargin;
  const boardWidth = (hexWidth + hexMargin * 2) * hexCount + rowOffset + 20;
  const boardHeight = (hexHeight + hexMargin + 25) * 4 + 20;
  const rows = ['A','B','C','D'];
  const columns = [1,2,3,4,5,6,7];

  const boardStyle = {
    backgroundColor: '#0e2b51',
    width: `${boardWidth}px`,
    height: `${boardHeight}px`,
    textAlign: 'center',
    paddingTop: '8px',
    paddingBottom: '15px',
    paddingLeft: '10px',
    paddingRight: '10px',
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toPosition) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData('item');
    if(itemData) {
      const item = JSON.parse(itemData);
      addItemToChampion(toPosition, item);
      return;
    }
    const championData = e.dataTransfer.getData('champion');
    if(!championData) return;
    const champion = JSON.parse(championData);
    const fromPosition = champion.origPosition;
    if(fromPosition === toPosition) return;
    if(fromPosition) {
      swapOnBoard(champion, fromPosition, toPosition);
      return;
    }
    addToTeam(champion, toPosition);
  };

  const handleDragStart = (e, champion, origPosition) => {
    e.dataTransfer.setData('champion', JSON.stringify({...champion, origPosition}));
  };

  return (
    <div style={boardStyle}>
      {rows.map((rowLetter, rowIndex) => (
        <div
          key={rowLetter}
          style={{
            marginLeft: (rowLetter === 'B' || rowLetter === 'D') ? `${rowOffset}px` : '0px',
            position: 'relative',
            zIndex: rows.length - rowIndex,
          }}
        >
          {columns.map(colNum => {
            const position = `${rowLetter}${colNum}`;
            const champion = team[position];

            return (
              <div
                key={position}
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  margin: `${hexMargin}px`,
                  width: `${hexWidth}px`,
                  height: `${hexHeight + 25}px`,
                  verticalAlign: 'top',
                }}
              >
                {/* The hex shape */}
                <div
                  style={{
                    width: `${hexWidth}px`,
                    height: `${hexHeight}px`,
                    backgroundColor: '#051120',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, position)}
                  onClick={() => champion && removeFromTeam(position)}
                >
                  {champion && (
                    <img
                      draggable
                      onDragStart={(e) => handleDragStart(e, champion, position)}
                      src={`https://raw.communitydragon.org/pbe/${champion.image_id}`}
                      alt={champion.name}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </div>

                {/* Items BELOW the hex */}
                {champion && champion.items && champion.items.length > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2px',
                    marginTop: '-18px',
                    position: 'relative',
                    zIndex: 999,
                  }}>
                    {champion.items.map((item, index) => (
                      <img
                        key={index}
                        src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/tft-item/${item.image_id}`}
                        alt={item.name}
                        title={item.name}
                        style={{
                          width: '22px',
                          height: '22px',
                          border: '1px solid #c9aa71',
                          borderRadius: '3px',
                          backgroundColor: '#0a1628',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default HexBoard;