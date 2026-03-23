import './App.css';
import { useState} from 'react';
import ChampionTable from './components/ChampionTable';
import HexBoard from './components/Hexboard'
import useChampions from './hooks/useChampions';
import useTeam from './hooks/useTeam';
import { filterByCost, filterByTrait, countTraits } from './utils/helpers';
import Filters from './components/Filters';
import ActiveTraits from './components/ActiveTraits';
import useItems from './hooks/useItems';
import ItemTable from './components/ItemTable';

function App() {
  //=============== STATES ================
  const [costFilter, setCostFilter] = useState('all'); //all shows all champions before you filter
  const [traitFilter, setTraitFilter] = useState('all');
  const { champions,traits } = useChampions();
  const { team, addToTeam, removeFromTeam, swapOnBoard, addItemToChampion } = useTeam();
  const { items } = useItems();
  
  const filteredByCost = filterByCost(champions, costFilter);
  const displayedChampions = filterByTrait(filteredByCost, traitFilter);
  const traitCounts = countTraits(team);


  // =========== RENDER ===============
return (
    <div style={{ backgroundColor: '#070d23', minHeight: '100vh', padding: '10px' }}>
      <header className="tft-team-builder">
        <Filters 
          traits={traits}
          onCostChange={setCostFilter}
          onTraitChange={setTraitFilter}
        />
        <p>Found {champions.length} champions</p>
        <p>Team: {Object.keys(team).length}/10</p>

        {/* Top section: Items + Hex board + Active Traits */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          flexWrap: 'wrap',
          marginBottom: '10px',
          alignItems: 'flex-start'
        }}>
          <div style={{ maxWidth: '480px' }}>
            <ItemTable items={items} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <HexBoard
                team={team}
                addToTeam={addToTeam}
                removeFromTeam={removeFromTeam}
                swapOnBoard={swapOnBoard}
                addItemToChampion={addItemToChampion}
              />
              <ChampionTable 
                displayedChampions={displayedChampions}
                addToTeam={addToTeam}
              />
          </div>
          <ActiveTraits 
            traitCounts={traitCounts}
            traits={traits}
          />
        </div>
      </header>
    </div>
  );
}

export default App;