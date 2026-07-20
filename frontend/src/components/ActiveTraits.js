// src/components/ActiveTraits.js
// Shows how many champions of each trait are currently on the board and how
// close each is to its next bonus tier. traitCounts is computed from the live
// team, so this updates automatically as champions are placed/removed.
function ActiveTraits({ traitCounts, traits }) {
  return (
    <div style={{ 
      backgroundColor: '#1a2942', 
      padding: '15px', 
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ color: '#c9aa71', marginTop: 0 }}>Active Traits</h3>
      
      {Object.entries(traitCounts).map(([traitName, count]) => {
        // breakpoints are stored as a "2,4,6" string in the DB; parse to numbers
        // and drop anything invalid so a malformed value can't crash the render.
        const traitData = traits.find(t => t.name === traitName);
        const breakpoints = traitData?.breakpoints && traitData.breakpoints.length > 0
          ? traitData.breakpoints.split(',').map(Number).filter(n => !isNaN(n) && n > 0)
          : [];

        // No known breakpoints → just show the raw count, nothing to progress toward.
        if (breakpoints.length === 0) {
          return (
            <p key={traitName} style={{ color: 'white', margin: '5px 0' }}>
              {traitName}: {count}
            </p>
          );
        }

        // Show progress toward the next unreached tier (e.g. 3/4). Once every
        // tier is hit, `find` returns nothing so we fall back to the max tier,
        // which reads as "maxed" (e.g. 6/6).
        const nextBreakpoint = breakpoints.find(bp => bp > count);
        const lastBreakpoint = breakpoints[breakpoints.length - 1];

        return (
          <p key={traitName} style={{ color: 'white', margin: '5px 0' }}>
            {traitName}: {count}/{nextBreakpoint || lastBreakpoint}
          </p>
        );
      })}
    </div>
  );
}
export default ActiveTraits;