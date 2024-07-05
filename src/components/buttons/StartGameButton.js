import React, { useState } from 'react';

const StartGameButton = ({ onStartGame }) => {
    const [playerName, setPlayerName] = useState('');

    const handleStartGame = () => {
        if (playerName.trim() !== '') {
            onStartGame(playerName);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter player name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
};

export default StartGameButton;
