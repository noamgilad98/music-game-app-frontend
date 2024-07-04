import React, { useState, useEffect } from 'react';
import StartGameButton from './components/buttons/StartGameButton';
import GetCardButton from './components/buttons/GetCardButton';
import SubmitButton from './components/buttons/SubmitButton';
import Timeline from './components/Timeline';
import Header from './components/Header';
import { startGame, getCard, submitCard } from './utils/api';
import './styles/App.css';

function App() {
    const [player, setPlayer] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

    const handleStartGame = async () => {
        const player = { name: 'Player 1' }; // Simulate player data
        const response = await startGame(player);
        setPlayer(response.player);
        setCards([response.card]);
        setCurrentSong(response.card.spotifyCode);
    };

    const handleAddCard = async (playerId) => {
        const card = await getCard(playerId);
        setCards([...cards, card]);
    };

    const handleSubmit = async (playerId, cards) => {
        const response = await submitCard(playerId, cards);
        if (response.success) {
            alert('Cards submitted successfully!');
        }
    };

    useEffect(() => {
        if (currentSong) {
            const iframe = document.getElementById('spotify-player');
            if (iframe) {
                iframe.src = `https://open.spotify.com/embed/track/${currentSong.split(':').pop()}?utm_source=generator`;
            }
        }
    }, [currentSong]);

    return (
        <div className="App">
            <Header />
            <main>
                {!player ? (
                    <StartGameButton onStartGame={handleStartGame} />
                ) : (
                    <>
                        <Timeline cards={cards} />
                        <div className="button-group">
                            <GetCardButton onAddCard={() => handleAddCard(player.id)} />
                            <SubmitButton onSubmit={() => handleSubmit(player.id, cards)} />
                        </div>
                        {currentSong && (
                            <iframe
                                id="spotify-player"
                                width="300"
                                height="80"
                                frameBorder="0"
                                allowtransparency="true"
                                allow="encrypted-media"
                            ></iframe>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
