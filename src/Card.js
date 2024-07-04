import React from 'react';
import { useDrag } from 'react-dnd';
import './Card.css';

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
      <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
        <p>{card.songName}</p>
        <p>{card.artist}</p>
        <p>{card.year}</p>
      </div>
  );
};

export default Card;
