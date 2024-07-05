import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ card }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: { id: card.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, padding: '10px', border: '1px solid gray', cursor: 'move' }}>
            {card.name}
        </div>
    );
};

export default Card;
