// src/components/ActiveTraits.js

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
        const traitData = traits.find(t => t.name === traitName);
        const breakpoints = traitData?.breakpoints 
          ? traitData.breakpoints.split(',').map(Number) 
          : [];
        const nextBreakpoint = breakpoints?.find(bp => bp > count);
        const lastBreakpoint = breakpoints?.[breakpoints.length - 1];
        
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