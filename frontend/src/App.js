import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react';

function App() {
  //create useState variable that react tracks
  const [champions, setChampions] = useState([]);
  const [costFilter, setCostFilter] = useState('all') //all shows all champions before you filter
  const [traits, setTraits] = useState([])
  const [traitFilter, setTraitFilter] = useState('all')

  //useEffect runs code when component loads
  //[] means run only once on first load

  useEffect(() => {
    fetch('http://localhost:8000/champions')  //call backend api
    .then(response => response.json())        //convert response to json
    .then(data => setChampions(data))         //Save data to champions variable 
    }, []);                                   //runs only once on load
  
  useEffect (() => {
    fetch('http://127.0.0.1:8000/traits')
    .then(response => response.json())
    .then(data => setTraits(data))
    }, [])   
  
  
  
  const filteredByCost = costFilter === 'all'
    ? champions
    : champions.filter(c => c.cost === Number(costFilter));
  
  const displayedChampions = traitFilter === 'all'
    ? filteredByCost
    : filteredByCost.filter(c => c.traits && c.traits.some(t => t.name === traitFilter));

  return (
    <div>
      <header className="TFT Team Builder">
        <img src={logo} className="App-logo" alt="logo" />
        <select onChange={c => setCostFilter(c.target.value)}>
          <option value="all"> All Costs</option>
          <option value='1'>1 Cost</option>
          <option value='2'>2 Cost</option>
          <option value='3'>3 Cost</option>
          <option value='4'>4 Cost</option>
          <option value='5'>5 Cost</option>
          <option value='7'>7 Cost</option>
        </select>
        <select onChange={t => setTraitFilter(t.target.value)}>
          <option value='all'>All traits</option>
          {traits.map(traits =>(
            <option key = {traits.id} value = {traits.name}> {traits.name}</option>
          ))}
        </select>
        <p>Found {champions.length} champions</p>
        {[1, 2, 3, 4, 5, 7].map(cost => {
  const championsAtCost = displayedChampions.filter(c => c.cost === cost);
  const regular = championsAtCost.filter(c => !c.is_unlockable);
  const unlockable = championsAtCost.filter(c => c.is_unlockable);
  
  return (
    <div key={cost} style={{
      backgroundColor: cost === 1 ? '#333741E6' : 
                       cost === 2 ? '#1a3d3dE6' : 
                       cost === 3 ? '#1a3351E6' :
                       cost === 4 ? '#321244E6' :
                       '#38322aE6',
                       width: '500px', 
                       padding: '10px',
                       marginBottom: '10px'
    }}>
      <div>
        {regular.map(champion => (
          <img 
            key={champion.id}
            src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/tft16_${champion.image_id.toLowerCase()}_square.tft_set16.png`}
            alt={champion.name}
            style={{
              width: '48px', 
              height: '48px',
              margin: '2px',
              border: '2px solid', 
              borderColor: cost === 1 ? '#aaaaac' : 
                           cost === 2 ? '#15b96d' : 
                           cost === 3 ? '#4db2e9' :
                           cost === 4 ? '#c80fae' :
                           '#e7b12f',}}
          />
        ))}
      </div>
      <div>
        {unlockable.map(champion => (
          <img 
            key={champion.id}
            src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/tft16_${champion.image_id.toLowerCase()}_square.tft_set16.png`}
            alt={champion.name}
            style={{
              width: '48px', 
              height: '48px', 
              margin: '2px', 
              border: '2px solid', 
              borderColor: cost === 1 ? '#aaaaac' : 
                           cost === 2 ? '#15b96d' : 
                           cost === 3 ? '#4db2e9' :
                           cost === 4 ? '#c80fae' :
                           '#e7b12f',}}
          />
        ))}
      </div>
    </div>
  );
})}
      </header>
    </div>
  );
}

export default App;

  // {displayedChampions.map(champion => (
  //         <div key = {champion.id} style = {{display: 'flex', alignItems: 'center', margin: '5px'}}>
  //         <img 
  //             src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/tft16_${champion.image_id.toLowerCase()}_square.tft_set16.png`}
  //             onError={(e) => {
  //               e.target.src = `https://ddragon.leagueoflegends.com/cdn/16.1.1/img/tft-champion/TFT16_${champion.image_id}.TFT_Set16.png`
  //             }}
  //             alt={champion.name}
  //             style={{width: '48px', height: '48px', marginRight: '10px'}}
  //         />
  //         {champion.name} - {champion.cost} gold
  //         {champion.is_unlockable ? ` (Unlock: ${champion.unlock_requirement})` : ''}
  //         </div>
  //       ))}
