import React, { useState } from 'react';
import StartGameButton from './components/buttons/StartGameButton';
import GetCardButton from './components/buttons/GetCardButton';
import SubmitButton from './components/buttons/SubmitButton';
import Timeline from './components/Timeline';
import './styles/App.css';
import { startGame, getCard, submitAndValidate } from './utils/api';

function App() {
    const [player, setPlayer] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [deck, setDeck] = useState([]);

    const handleStartGame = async (playerName) => {
        try {
            const { player, card } = await startGame(playerName);
            setPlayer(player);
            setTimeline([card]);
        } catch (error) {
            console.error('Failed to start game', error);
        }
    };

    const handleGetCard = async () => {
        if (!player) return;
        try {
            const card = await getCard(player.id);
            setDeck((prevDeck) => [...prevDeck, card]);
        } catch (error) {
            console.error('Failed to get card', error);
        }
    };

    const handleCardDrop = (cardId) => {
        const card = deck.find(c => c.id === cardId);
        if (card) {
            setDeck(deck.filter(c => c.id !== cardId));
            setTimeline(timeline.concat(card));
        }
    };

    const handleSubmit = async () => {
        if (!player) return;
        try {
            const card = deck[deck.length - 1];
            const response = await submitAndValidate(player.id, card);
            if (response.cardSubmitted) {
                setTimeline((prevTimeline) => [...prevTimeline, { ...card, faceUp: true }]);
                setDeck((prevDeck) => prevDeck.slice(0, -1));
            }
            if (response.isTimelineValid) {
                alert('Timeline is valid!');
            } else {
                alert('Timeline is invalid!');
            }
            if (response.gameWon) {
                alert('You won the game!');
            }
        } catch (error) {
            console.error('Failed to submit and validate card', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Music Game</h1>
            </header>
            {!player ? (
                <StartGameButton onStartGame={handleStartGame} />
            ) : (
                <>
                    <GetCardButton onAddCard={handleGetCard} />
                    <SubmitButton onSubmit={handleSubmit} />
                    <Timeline cards={timeline} onCardDrop={handleCardDrop} />
                </>
            )}
        </div>
    );
}

export default App;
