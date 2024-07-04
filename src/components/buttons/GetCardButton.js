import React from 'react';
import './Button.css';

function GetCardButton({ onAddCard }) {
    return (
        <button className="button get-card-button" onClick={onAddCard}>
            Get Card
        </button>
    );
}

export default GetCardButton;
