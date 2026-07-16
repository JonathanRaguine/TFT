// src/components/SavedTeams.js
import React, { useState } from 'react';
import { getCostColor } from '../utils/helpers';

const hexClipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

function SavedTeams({ savedTeams, onCreateTeam, onLoadTeam, removeSavedTeam, boardCount }) {
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');

  const handleCreateClick = () => {
    if (boardCount === 0) return;
    setShowModal(true);
  };

  const handleConfirm = () => {
    const name = teamName.trim();
    if (!name) return;
    onCreateTeam(name);
    setTeamName('');
    setShowModal(false);
  };

  const handleCancel = () => {
    setTeamName('');
    setShowModal(false);
  };

  return (
    <div style={{
      backgroundColor: '#1a2942',
      border: '1px solid #2a3f5f',
      borderRadius: '5px',
      padding: '12px',
      width: '380px',
      flexShrink: 0,
      alignSelf: 'flex-start',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <h3 style={{ color: '#c9aa71', margin: 0 }}>Saved Teams</h3>
        <button
          onClick={handleCreateClick}
          disabled={boardCount === 0}
          title={boardCount === 0 ? 'Place champions on the board first' : 'Save current board as a team'}
          style={{
            backgroundColor: boardCount === 0 ? '#2a3f5f' : '#c9aa71',
            color: boardCount === 0 ? '#7a8aa0' : '#0e1e36',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 16px',
            fontWeight: 'bold',
            cursor: boardCount === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Create
        </button>
      </div>

      {savedTeams.length === 0 && (
        <p style={{ color: '#555', fontSize: '12px', textAlign: 'center', margin: '10px 0' }}>
          Build a team on the board and click Create to save it.
        </p>
      )}

      {savedTeams.map((teamEntry) => (
        <div
          key={teamEntry.id}
          onClick={() => onLoadTeam(teamEntry.board)}
          title="Click to load this team onto the board"
          style={{
            marginBottom: '14px',
            backgroundColor: '#0e1e36',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
              {teamEntry.name}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); removeSavedTeam(teamEntry.id); }}
              title="Remove team"
              style={{
                background: 'none',
                border: 'none',
                color: '#e06c6c',
                cursor: 'pointer',
                fontSize: '14px',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {Object.values(teamEntry.board).map((champion, champIndex) => (
              <div
                key={champIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '48px',
                }}
              >
                {/* Cost-colored hex border wrapping the portrait */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  padding: '2px',
                  backgroundColor: getCostColor(champion.cost),
                  clipPath: hexClipPath,
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#051120',
                    clipPath: hexClipPath,
                    overflow: 'hidden',
                  }}>
                    <img
                      src={`https://raw.communitydragon.org/latest/${champion.image_id}`}
                      alt={champion.name}
                      title={champion.name}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>

                {/* Items below the portrait */}
                <div style={{ display: 'flex', gap: '1px', marginTop: '2px', minHeight: '15px' }}>
                  {(champion.items || []).map((item, itemIndex) => (
                    <img
                      key={itemIndex}
                      src={`https://ddragon.leagueoflegends.com/cdn/16.10.1/img/tft-item/${item.image_id}`}
                      alt={item.name}
                      title={item.name}
                      style={{
                        width: '14px',
                        height: '14px',
                        border: '1px solid #c9aa71',
                        borderRadius: '2px',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#1a2942',
            border: '1px solid #2a3f5f',
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
          }}>
            <h3 style={{ color: '#c9aa71', marginTop: 0 }}>Name your team</h3>
            <input
              autoFocus
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConfirm();
                if (e.key === 'Escape') handleCancel();
              }}
              placeholder="Team name"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #2a3f5f',
                backgroundColor: '#0e1e36',
                color: 'white',
                marginBottom: '14px',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: '1px solid #2a3f5f',
                  backgroundColor: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#c9aa71',
                  color: '#0e1e36',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedTeams;
