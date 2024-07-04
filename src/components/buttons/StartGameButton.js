import React from 'react';
import './Button.css';

function StartGameButton({ onStartGame }) {
    return (
        <button className="button start-game-button" onClick={onStartGame}>
            Start Game
        </button>
    );
}

export default StartGameButton;
