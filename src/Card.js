import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {card.songName ? (
        <>
          <p>{card.songName}</p>
          <p>{card.artist}</p>
          <p>{card.year}</p>
        </>
      ) : (
        <p>Guess the song!</p>
      )}
    </div>
  );
};

export default Card;
