import './App.css';
import { useState} from 'react';
import ChampionTable from './components/ChampionTable';
import HexBoard from './components/Hexboard'
import useChampions from './hooks/useChampions';
import useTeam from './hooks/useTeam';
import { filterByCost, filterByTrait, countTraits } from './utils/helpers';
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

        {/* ===== TOP ROW: Traits | Hex Board | 2 blank sections ===== */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginBottom: '10px',
          alignItems: 'stretch',
        }}>
          {/* Left - Active Traits */}
          <ActiveTraits 
            traitCounts={traitCounts}
            traits={traits}
          />

          {/* Center - Hex Board */}
          <HexBoard
            team={team}
            addToTeam={addToTeam}
            removeFromTeam={removeFromTeam}
            swapOnBoard={swapOnBoard}
            addItemToChampion={addItemToChampion}
          />

          {/* Right - 2 blank boxes stacked */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
          }}>
            <div style={{
              backgroundColor: '#1a2942',
              border: '1px solid #2a3f5f',
              borderRadius: '5px',
              padding: '15px',
              flex: 1,
              minWidth: '150px',
              color: '#555',
              textAlign: 'center',
            }}>
              {/* Leave blank for future updates */}
            </div>
            <div style={{
              backgroundColor: '#1a2942',
              border: '1px solid #2a3f5f',
              borderRadius: '5px',
              padding: '15px',
              flex: 1,
              minWidth: '150px',
              color: '#555',
              textAlign: 'center',
            }}>
              {/* Leave blank for future updates */}
            </div>
          </div>
        </div>

        {/* ===== BOTTOM ROW: Champion Table | Item Table ===== */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}>
          {/* Champion table - scrollable */}
          <div style={{
            overflowY: 'auto',
            width: '665px',
            height: '400px',
            border: '1px solid #2a3f5f',
            borderRadius: '5px',
          }}>
            <ChampionTable 
              displayedChampions={displayedChampions}
              addToTeam={addToTeam}
              traits={traits}
              onCostChange={setCostFilter}
              onTraitChange={setTraitFilter}
            />
          </div>

          {/* Items table - scrollable */}
          <div style={{
            overflowY: 'auto',
            width: '350px',
            height: '400px',
            border: '1px solid #2a3f5f',
            borderRadius: '5px',
          }}>
            <ItemTable items={items} />
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;