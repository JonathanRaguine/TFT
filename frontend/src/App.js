import './App.css';
import { useState, useEffect } from 'react';
import ChampionTable from './ChampionTable';
import HexBoard from './Hexboard'

function App() {
  //create useState variable that react tracks
  const [champions, setChampions] = useState([]);
  const [costFilter, setCostFilter] = useState('all'); //all shows all champions before you filter
  const [traits, setTraits] = useState([]);
  const [traitFilter, setTraitFilter] = useState('all');
  const [team, setTeam] = useState({});
  const traitCounts = {};


  //useEffect runs code when component loads
  //[] means run only once on first load

  useEffect(() => {
    fetch('http://localhost:8000/champions')  //call backend api
      .then(response => response.json())      //convert response to json
      .then(data => setChampions(data));      //Save data to champions variable 
  }, []);                                     //runs only once on load
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/traits')
      .then(response => response.json())
      .then(data => setTraits(data));
  }, []);
  
  const filteredByCost = costFilter === 'all'
    ? champions
    : champions.filter(c => c.cost === Number(costFilter));
  
  const displayedChampions = traitFilter === 'all'
    ? filteredByCost
    : filteredByCost.filter(c => c.traits && c.traits.some(t => t.name === traitFilter));

  const addToTeam = (champion, position) => {
    if (Object.keys(team).length >= 10) return; //max 10 champions on the board
    if (Object.values(team).find(c=>c.id===champion.id)) return; // no duplicates
    if(team[position]) return; // hex already occupied
    setTeam({...team, [position]:champion});
  };

  const removeFromTeam = (position) => {
    const newTeam = {...team};
    delete newTeam[position];
    setTeam(newTeam);
  };
  
  const swapOnBoard = (champion, origPosition, toPosition) => {
    setTeam(currentTeam => {
      const newTeam = {...currentTeam};
      const championAtTarget = currentTeam[toPosition];
      //remove from orig position
      if (origPosition){
        delete newTeam[origPosition];
      }
      //if swapping move target champion to the original position
      if (championAtTarget && origPosition){
        newTeam[origPosition] = championAtTarget;
      }
      //place dragged champion onto new position
      newTeam[toPosition] = champion;
      return newTeam; 
    });
  };


Object.values(team).forEach(champion => {
  champion.traits.forEach(trait => {
    traitCounts[trait.name] = (traitCounts[trait.name] || 0) + 1;
  });
});

  return (
    <div style = {{ backgroundColor: '#070d23'}}>
      <header className="TFT Team Builder">
        <select onChange={c => setCostFilter(c.target.value)}> {/*select cost?*/}
          <option value="all">All Costs</option>
          <option value='1'>1 Cost</option>
          <option value='2'>2 Cost</option>
          <option value='3'>3 Cost</option>
          <option value='4'>4 Cost</option>
          <option value='5'>5 Cost</option>
          <option value='7'>7 Cost</option>
        </select>
        <select onChange={t => setTraitFilter(t.target.value)}> {/*select trait?*/}
          <option value='all'>All traits</option>
          {traits.map(trait => (
            <option key={trait.id} value={trait.name}>{trait.name}</option>
          ))}
        </select>
        <p>Found {champions.length} champions</p>
        <p>Team: {Object.keys(team).length}/10</p>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <ChampionTable 
            displayedChampions={displayedChampions}
            addToTeam={addToTeam}
          />
          <HexBoard
            team={team}
            addToTeam={addToTeam}
            removeFromTeam={removeFromTeam}
            swapOnBoard={swapOnBoard}
          />
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
              const breakpoints = traitData?.breakpoints?.split(',').map(Number);
              const nextBreakpoint = breakpoints?.find(bp => bp > count);
              const lastBreakpoint = breakpoints?.[breakpoints.length - 1];
              
              return (
                <p key={traitName} style={{ color: 'white', margin: '5px 0' }}>
                  {traitName}: {count}/{nextBreakpoint || lastBreakpoint}
                </p>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;