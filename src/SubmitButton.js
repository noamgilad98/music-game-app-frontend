import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ playerId, timeline }) => {
  const handleSubmit = () => {
    fetch(`http://localhost:8080/api/game/submit-timeline?playerId=${playerId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timeline),
    })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            alert('Timeline submitted successfully!');
          } else {
            alert('There was an error submitting your timeline.');
          }
        })
        .catch((error) => console.error('Error:', error));
  };

  return (
      <button onClick={handleSubmit} className="submit-button">
        Submit Timeline
      </button>
  );
};

export default SubmitButton;
