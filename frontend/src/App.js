import './App.css';
import { useState} from 'react';
import ChampionTable from './components/ChampionTable';
import HexBoard from './components/Hexboard'
import useChampions from './hooks/useChampions';
import useTeam from './hooks/useTeam';
import { filterByCost, filterByTrait, countTraits } from './utils/helpers';
import Filters from './components/Filters';
import ActiveTraits from './components/ActiveTraits';

function App() {
  //=============== STATES ================
  const [costFilter, setCostFilter] = useState('all'); //all shows all champions before you filter
  const [traitFilter, setTraitFilter] = useState('all');
  const { champions,traits } = useChampions();
  const { team, addToTeam, removeFromTeam, swapOnBoard } = useTeam(); 
  const filteredByCost = filterByCost(champions, costFilter);
  const displayedChampions = filterbyTrait(filteredByCost, traitFilter);
  const traitCounts = countTraits(team);

  // =========== RENDER ===============
  return (
    <div style = {{ backgroundColor: '#070d23'}}>
      <header className="tft-team-builder">
        <Filters 
          traits={traits}
          onCostChange={setCostFilter}
          onTraitChange={setTraitFilter}
        />
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