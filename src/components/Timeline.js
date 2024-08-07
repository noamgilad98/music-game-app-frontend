// src/components/Timeline.js
import React from 'react';
import Card from './Card'; // Import the Card component
import '../styles/Timeline.css';

function Timeline({ cards }) {
    return (
        <div className="timeline">
            {cards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
}

export default Timeline;
