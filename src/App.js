import React, { useState } from 'react';
import Header from './components/Header';
import StartGameButton from './components/buttons/StartGameButton';
import GetCardButton from './components/buttons/GetCardButton';
import SubmitButton from './components/buttons/SubmitButton';
import Timeline from './components/Timeline';
import Card from './components/Card';
import { startGame, getCard, submitAndValidate } from './utils/api';
import './styles/App.css';

function App() {
    const [player, setPlayer] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isCardPlaced, setIsCardPlaced] = useState(false);

    const handleStartGame = async (playerName) => {
        try {
            const gameData = await startGame(playerName);
            setPlayer(gameData.player);
            setCards([gameData.card]);
            playSong(gameData.card.previewUrl);
            setIsCardPlaced(true);
        } catch (error) {
            console.error('Error starting game:', error);
        }
    };

    const handleGetCard = async () => {
        if (!player || isCardPlaced) return;
        try {
            const card = await getCard(player.id);
            setCurrentCard(card);
            playSong(card.previewUrl);
            setIsCardPlaced(true);
        } catch (error) {
            console.error('Error getting card:', error);
        }
    };

    const playSong = (url) => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(url);
        newAudio.play();
        setAudio(newAudio);
    };

    const handleSubmitCard = async () => {
        if (!player || !currentCard) return;
        try {
            const updatedCards = [...cards, currentCard];
            const result = await submitAndValidate(player.id, currentCard);
            if (result.isValid) {
                setCards(updatedCards);
            }
            setCurrentCard(null);
            setIsCardPlaced(false);
        } catch (error) {
            console.error('Error submitting card:', error);
        }
    };

    return (
        <div className="App">
            <Header />
            {!player ? (
                <StartGameButton onStartGame={handleStartGame} />
            ) : (
                <div>
                    <Timeline cards={cards} />
                    {currentCard && (
                        <div>
                            <p>Place the card:</p>
                            {/* Add drag-and-drop functionality here */}
                            <div>
                                <Card card={currentCard} />
                            </div>
                        </div>
                    )}
                    <div className="button-group">
                        <GetCardButton onAddCard={handleGetCard} disabled={isCardPlaced} />
                        <SubmitButton onSubmit={handleSubmitCard} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
