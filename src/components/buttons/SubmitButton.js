import React from 'react';
import './Button.css';

function SubmitButton({ onSubmit }) {
    return (
        <button className="button submit-button" onClick={onSubmit}>
            Submit Cards
        </button>
    );
}

export default SubmitButton;
