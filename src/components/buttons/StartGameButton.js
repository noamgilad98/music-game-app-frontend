import React, { useState } from 'react';
import './Button.css';

const StartGameButton = ({ onStartGame }) => {
    const [playerName, setPlayerName] = useState('');

    const handleStart = () => {
        if (playerName.trim()) {
            onStartGame(playerName);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
            />
            <button className="button" onClick={handleStart}>Start Game</button>
        </div>
    );
};

export default StartGameButton;
