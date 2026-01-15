import React from "react";

function HexBoard({team, addToTeam, removeFromTeam, swapOnBoard}) {
  // Base values - change these to resize everything
  const hexWidth = 80;
  const hexCount = 7;

  // Everything else calculated from base
  const hexHeight = hexWidth * 1.15;
  const hexMargin = hexWidth * 0.04;
  const rowOffset = (hexWidth / 2) + hexMargin;
  const boardWidth = (hexWidth + hexMargin * 2) * hexCount + rowOffset + 20;
  const boardHeight = (hexHeight + hexMargin) * 4 + 20;
  const rows = ['A','B','C','D']; // 4 rows
  const columns =[1,2,3,4,5,6,7] // 7 hexes per row
  
  const hexStyle = {
    width: `${hexWidth}px`,
    height: `${hexHeight}px`,
    backgroundColor: '#051120',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    display: 'inline-block',
    margin: `${hexMargin}px`,
  };
  const boardStyle = {
    backgroundColor: '#0e2b51',
    width: `${boardWidth}px`,
    height: `${boardHeight}px`,
    textAlign: 'center',
    paddingTop: '8px',      // less on top
    paddingBottom: '15px',  // more on bottom
    paddingLeft: '10px',
    paddingRight: '10px',
  };

  const handleDragOver = (e) =>{
    e.preventDefault();
  };

  const handleDrop = (e, toPosition) =>{
    e.preventDefault();
    const championData = e.dataTransfer.getData('champion');
    if(!championData) return ;
  
    const champion = JSON.parse(championData);
    const fromPosition = champion.origPosition;

    //dont do anything if dropping on the same position
    if(fromPosition === toPosition) return;
    if(fromPosition) {
      swapOnBoard(champion,fromPosition,toPosition);
      return;
    }
    addToTeam(champion,toPosition);
  };

  const handleDragStart = (e, champion, origPosition) => {
    e.dataTransfer.setData('champion', JSON.stringify({...champion, origPosition})
    );
  };
  
  
  return (
    <div style={boardStyle}>
      {rows.map(rowLetter => (
        <div 
          key={rowLetter} 
          style={{ 
            marginLeft: (rowLetter === 'B' || rowLetter === 'D') ? `${rowOffset}px` : '0px'
          }}
        >
          {columns.map(colNum => {
            const position = `${rowLetter}${colNum}`;  // "A1", "B3", etc.
            const champion = team[position];           // champion at this hex (or undefined)
            
            return (
              <div 
                key={position}
                style={hexStyle}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, position)}
                onClick={() => champion && removeFromTeam(position)}
              >
                {champion && (
                  <img
                    draggable
                    onDragStart ={(e) => handleDragStart(e,champion,position)}
                    src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/tft16_${champion.image_id.toLowerCase()}_square.tft_set16.png`}
                    alt={champion.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  />
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