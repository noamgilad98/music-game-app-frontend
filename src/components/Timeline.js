import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Timeline = ({ cards, onCardDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item) => onCardDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} style={{ border: '1px solid black', minHeight: '200px', padding: '10px' }}>
            {cards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
            {isOver && <div>Drop here!</div>}
        </div>
    );
};

export default Timeline;
