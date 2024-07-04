import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import './Timeline.css';

const Timeline = ({ timeline, onDropCard }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const index = Math.round(delta.x / 100); // Assume each card is 100px wide
      onDropCard(item.card, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
      <div ref={drop} className={`timeline ${isOver ? 'hover' : ''}`}>
        {timeline.map((card, index) => (
            <Card key={card.id} card={card} />
        ))}
      </div>
  );
};

export default Timeline;
