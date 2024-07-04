import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [player, setPlayer] = useState(null);
  const [card, setCard] = useState(null);
  const [hiddenCard, setHiddenCard] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [timeline, setTimeline] = useState([]);

  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/game/start', { name: 'Player1' });
      setPlayer(response.data.player);
      setCard(response.data.card);
      console.log("Game started with player and card:", response.data);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const getNewCard = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/game/get-card?playerId=${player.id}`);
      setHiddenCard(response.data);
      setIsCardVisible(false);
      console.log("New card received:", response.data);
    } catch (error) {
      console.error('Error getting new card:', error);
    }
  };

  const submitCard = async (index) => {
    try {
      await axios.post(`http://localhost:8080/api/game/submit-card?playerId=${player.id}`, hiddenCard);
      const updatedTimeline = [...timeline];
      updatedTimeline[index] = hiddenCard;
      setTimeline(updatedTimeline);
      setIsCardVisible(true);
      console.log("Card submitted:", hiddenCard);
    } catch (error) {
      console.error('Error submitting card:', error);
    }
  };

  return (
    <div className="App">
      <button onClick={startGame}>Start Game</button>
      {card && (
        <div>
          <h2>Now Playing: {card.songName} by {card.artist}</h2>
          <audio controls src={`https://open.spotify.com/track/${card.spotifyCode}`} />
          <button onClick={getNewCard}>Get New Card</button>
        </div>
      )}
      {hiddenCard && !isCardVisible && (
        <div>
          <h2>New Card Received</h2>
          <audio controls src={`https://open.spotify.com/track/${hiddenCard.spotifyCode}`} />
          <div>
            {timeline.map((card, index) => (
              <div key={index}>
                {card ? `${card.songName} by ${card.artist} (${card.year})` : 'Empty Slot'}
              </div>
            ))}
            <button onClick={() => submitCard(timeline.length)}>Place Card Here</button>
          </div>
        </div>
      )}
      {timeline.length > 0 && (
        <div>
          <h2>Timeline</h2>
          {timeline.map((card, index) => (
            <div key={index}>
              {card ? `${card.songName} by ${card.artist} (${card.year})` : 'Empty Slot'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
