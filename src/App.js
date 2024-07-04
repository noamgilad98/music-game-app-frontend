import React, { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import StartGameButton from './StartGameButton';
import GetCardButton from './GetCardButton';
import SubmitButton from './SubmitButton';
import Timeline from './Timeline';
import './App.css';

function App() {
  const [player, setPlayer] = useState(null);
  const [timeline, setTimeline] = useState([]);

  const handleStartGame = (playerData, initialCard) => {
    setPlayer(playerData);
    setTimeline([initialCard]);
  };

  const handleGetCard = (newCard) => {
    setTimeline([...timeline, newCard]);
  };

  const handleDropCard = (card, index) => {
    const newTimeline = [...timeline];
    newTimeline[index] = card;
    setTimeline(newTimeline);
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <header className="app-header">
            <h1>Music Timeline Game</h1>
          </header>
          <main>
            {!player ? (
                <StartGameButton onStartGame={handleStartGame} />
            ) : (
                <>
                  <GetCardButton onGetCard={handleGetCard} playerId={player.id} />
                  <Timeline timeline={timeline} onDropCard={handleDropCard} />
                  <SubmitButton playerId={player.id} timeline={timeline} />
                </>
            )}
          </main>
        </div>
      </DndProvider>
  );
}

export default App;
