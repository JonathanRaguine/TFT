import React from "react";

// TFT's cost tiers each have a signature color (1-cost gray ... 5/7-cost gold).
// We tint each champion's hex border with it so cost is readable at a glance.
// (This mirrors getCostColor() in utils/helpers — could be swapped to use it to
// avoid keeping two copies of these values in sync.)
const costColors = {
  1: '#aaaaac',
  2: '#15b96d',
  3: '#4db2e9',
  4: '#c80fae',
  5: '#e7b12f',
  7: '#e7b12f',
};

// The hexagon shape, defined once and reused. clip-path cuts the div down to
// these six points. Kept as a constant so the outer (border) and inner (fill)
// hexes are guaranteed identical — see the render for why there are two.
const hexClipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

function HexBoard({team, addToTeam, removeFromTeam, swapOnBoard, addItemToChampion}) {
  // Everything is derived from one number (hexWidth) so the whole board scales
  // by changing just that. hexHeight > width because a pointy-top hexagon is
  // taller than it is wide; rowOffset is half a hex, used to stagger rows.
  const hexWidth = 80;
  const hexCount = 7;
  const hexHeight = hexWidth * 1.15;
  const hexMargin = hexWidth * 0.04;
  const rowOffset = (hexWidth / 2) + hexMargin;
  const boardWidth = (hexWidth + hexMargin * 2) * hexCount + rowOffset + 20;
  const boardHeight = (hexHeight + hexMargin + 25) * 4 + 20;
  // TFT's board is a fixed 4 rows x 7 columns. Positions are named "A1".."D7".
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

  // One drop handler serves three different drags. We tell them apart by which
  // key was set on the dataTransfer ('item' vs 'champion'):
  const handleDrop = (e, toPosition) => {
    e.preventDefault();
    // 1) An item dropped onto a hex → attach it to the champion sitting there.
    const itemData = e.dataTransfer.getData('item');
    if(itemData) {
      const item = JSON.parse(itemData);
      addItemToChampion(toPosition, item);
      return;
    }
    const championData = e.dataTransfer.getData('champion');
    if(!championData) return;
    const champion = JSON.parse(championData);
    // origPosition is only set when the champion was dragged FROM the board.
    const fromPosition = champion.origPosition;
    if(fromPosition === toPosition) return; // dropped on its own hex → no-op
    // 2) Came from another hex → move/swap within the board.
    if(fromPosition) {
      swapOnBoard(champion, fromPosition, toPosition);
      return;
    }
    // 3) No origin → it's a fresh champion dragged in from the table.
    addToTeam(champion, toPosition);
  };

  // Stash the champion (plus where it came from) on the drag event so handleDrop
  // can read it. origPosition is what later distinguishes a board move from a
  // brand-new placement.
  const handleDragStart = (e, champion, origPosition) => {
    e.dataTransfer.setData('champion', JSON.stringify({...champion, origPosition}));
  };

  return (
    <div style={boardStyle}>
      {rows.map((rowLetter, rowIndex) => (
        <div
          key={rowLetter}
          style={{
            // Indent every other row by half a hex so rows interlock into the
            // classic honeycomb pattern instead of a plain grid.
            marginLeft: (rowLetter === 'B' || rowLetter === 'D') ? `${rowOffset}px` : '0px',
            position: 'relative',
            // Earlier rows sit above later ones. Hexes overlap slightly, so this
            // makes a champion's item icons (which hang below its hex) render on
            // top of the row beneath rather than being clipped by it.
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
                {/* The cost-colored border is faked with two stacked hexagons.
                    A normal CSS `border` can't follow a clip-path's diagonal
                    edges (it only shows on the vertical sides), so instead:
                    OUTER hex = filled with the cost color, with 2px padding.
                    INNER hex (below) = dark fill + the portrait, sitting on top.
                    The 2px of outer color peeking out around the inner hex reads
                    as a border that hugs all six edges. Empty hexes skip the
                    padding/color and just show the dark slot. */}
                <div
                  style={{
                    boxSizing: 'border-box',
                    width: `${hexWidth}px`,
                    height: `${hexHeight}px`,
                    padding: champion ? '2px' : '0px',
                    backgroundColor: champion ? (costColors[champion.cost] || '#c9aa71') : '#051120',
                    clipPath: hexClipPath,
                  }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, position)}
                  onClick={() => champion && removeFromTeam(position)}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#051120',
                      clipPath: hexClipPath,
                    }}
                  >
                    {champion && (
                      <img
                        draggable
                        onDragStart={(e) => handleDragStart(e, champion, position)}
                        src={`https://raw.communitydragon.org/latest/${champion.image_id}`}
                        alt={champion.name}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Item row for a placed champion. marginTop is negative so the
                    icons tuck up over the bottom of the hex (like in-game), and
                    the high zIndex keeps them above the hex below. */}
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
                        src={`https://ddragon.leagueoflegends.com/cdn/16.10.1/img/tft-item/${item.image_id}`}
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