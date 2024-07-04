import React from 'react';
import '../styles/Card.css';

function Card({ card }) {
    return (
        <div className="card">
            <h3>{card.songName}</h3>
            <p>{card.artist}</p>
            <p>{card.year}</p>
        </div>
    );
}

export default Card;
