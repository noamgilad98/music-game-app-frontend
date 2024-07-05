import React, { useState } from 'react';
import '../styles/Card.css';

function Card({ card }) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            {flipped ? (
                <div className="card-back">
                    <img src="/path-to-logo.png" alt="Card back" />
                </div>
            ) : (
                <div className="card-front">
                    <h3>{card.songName}</h3>
                    <p>{card.artist}</p>
                    <p>{card.year}</p>
                </div>
            )}
        </div>
    );
}

export default Card;
