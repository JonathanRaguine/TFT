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
import useItemPriority from './hooks/useItemPriority';
import useAltBuilds from './hooks/useAltBuilds';
import ItemPriority from './components/ItemPriority';
import AltBuilds from './components/AltBuilds';
import useSavedTeams from './hooks/useSavedTeams';
import SavedTeams from './components/SavedTeams';

// App is the single place that owns all shared state (via the hooks below) and
// wires it into the child components. State lives here, not in the children, so
// that e.g. the board and the trait counter can react to the same data.
function App() {
  //=============== STATES ================
  const [costFilter, setCostFilter] = useState('all'); //all shows all champions before you filter
  const [traitFilter, setTraitFilter] = useState('all');
  const { champions,traits } = useChampions();
  const { team, addToTeam, removeFromTeam, swapOnBoard, addItemToChampion, loadTeam } = useTeam();
  const { items } = useItems();

  const { priorityItems, addPriorityItem, removePriorityItem } = useItemPriority();
  const { altBuilds, addAltBuild, addItemToAltBuild, removeAltBuild } = useAltBuilds();
  const { savedTeams, addSavedTeam, removeSavedTeam } = useSavedTeams();

  // Derived values, recomputed each render from the raw data above. Filters and
  // trait counts aren't stored as state — they're always a function of the
  // current champions/team, so deriving them avoids keeping two things in sync.
  const filteredByCost = filterByCost(champions, costFilter);
  const displayedChampions = filterByTrait(filteredByCost, traitFilter);
  const traitCounts = countTraits(team);

  // Snapshot the board as a plain copy at save time. The spread matters: without
  // it we'd store a live reference and later board edits would mutate the saved
  // team. `team` is keyed by position, so copying it preserves where each
  // champion sat — that's what lets a saved team reload onto the same hexes.
  const saveCurrentTeam = (name) => {
    addSavedTeam(name, { ...team });
  };

  


  // =========== RENDER ===============
return (
    <div style={{ backgroundColor: '#070d23', minHeight: '100vh', padding: '10px' }}>
      {/* Outer flex row: pins Saved Teams to the far left, with the rest of the
          builder taking the remaining width (flex:1) to its right. alignItems
          flex-start keeps the panel anchored to the top instead of stretching. */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>

      {/* ===== FAR LEFT: Saved Teams ===== */}
      {/* boardCount is passed (not the whole team) just so the panel can disable
          its Create button when the board is empty. */}
      <SavedTeams
        savedTeams={savedTeams}
        onCreateTeam={saveCurrentTeam}
        onLoadTeam={loadTeam}
        removeSavedTeam={removeSavedTeam}
        boardCount={Object.keys(team).length}
      />

      <header className="tft-team-builder" style={{ flex: 1 }}>

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
          {/* Right - Item Priority + Alt Builds stacked */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
          }}>
            <ItemPriority
              priorityItems={priorityItems}
              addPriorityItem={addPriorityItem}
              removePriorityItem={removePriorityItem}
            />
            <AltBuilds
              altBuilds={altBuilds}
              addAltBuild={addAltBuild}
              addItemToAltBuild={addItemToAltBuild}
              removeAltBuild={removeAltBuild}
            />
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
    </div>
  );
}

export default App;