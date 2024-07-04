import React from 'react';
import { useDrop } from 'react-dnd';

const Timeline = ({ timeline, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onDrop(item.card),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="timeline" style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
      {timeline.map((card, index) => (
        <div key={index} className="card">
          <p>{card.songName}</p>
          <p>{card.artist}</p>
          <p>{card.year}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
