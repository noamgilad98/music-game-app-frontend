import React, { useState, useEffect, useRef } from 'react';
import StartGameButton from './components/buttons/StartGameButton';
import GetCardButton from './components/buttons/GetCardButton';
import SubmitButton from './components/buttons/SubmitButton';
import Timeline from './components/Timeline';
import './styles/App.css';
import { startGame, getCard, submitCard, getAccessToken, getTrack } from './utils/api';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

function App() {
    const [player, setPlayer] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const audioRef = useRef(null);

    const handleStartGame = async (playerName) => {
        try {
            const { player, card } = await startGame(playerName);
            setPlayer(player);
            setCards([card]);
            playSong(card.spotifyCode);
        } catch (error) {
            console.error('Failed to start game', error);
        }
    };

    const handleAddCard = async (playerId) => {
        const card = await getCard(playerId);
        setCards([...cards, { ...card, faceUp: false }]);
    };

    const handleSubmit = async () => {
        const response = await submitCard(player.id, cards);
        if (response.success) {
            alert('Cards submitted successfully!');
        }
    };

    const playSong = (spotifyCode) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setCurrentSong(spotifyCode);
    };

    useEffect(() => {
        const fetchAndPlaySong = async () => {
            if (currentSong) {
                const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
                const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
                try {
                    const accessToken = await getAccessToken(clientId, clientSecret);
                    const trackId = currentSong.split(':').pop();
                    const track = await getTrack(trackId, accessToken);

                    if (audioRef.current) {
                        audioRef.current.src = track.preview_url;
                        audioRef.current.play();
                    }
                } catch (error) {
                    console.error('Error fetching track:', error);
                }
            }
        };

        fetchAndPlaySong();
    }, [currentSong]);

    const moveCard = (dragIndex, hoverIndex) => {
        const draggedCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, draggedCard],
            ],
        }));
    };

    const handleDrop = (index) => {
        const newCards = cards.map((card, i) => {
            if (i === index) {
                return { ...card, faceUp: true };
            }
            return card;
        });
        setCards(newCards);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Music Game</h1>
            </header>
            <main>
                {!player ? (
                    <StartGameButton onStartGame={handleStartGame} />
                ) : (
                    <>
                        <DndProvider backend={HTML5Backend}>
                            <Timeline cards={cards} moveCard={moveCard} handleDrop={handleDrop} />
                        </DndProvider>
                        <div className="button-group">
                            <GetCardButton onAddCard={() => handleAddCard(player.id)} />
                            <SubmitButton onSubmit={handleSubmit} />
                        </div>
                    </>
                )}
                <audio ref={audioRef} />
            </main>
        </div>
    );
}

export default App;
