import React, { useState, useEffect, useRef } from 'react';
import StartGameButton from './components/buttons/StartGameButton';
import GetCardButton from './components/buttons/GetCardButton';
import SubmitButton from './components/buttons/SubmitButton';
import Timeline from './components/Timeline';
import './styles/App.css';
import { startGame, getCard } from './utils/api';
import { getAccessToken, getTrack } from './utils/SpotifyService';

function App() {
    const [player, setPlayer] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentTrackUri, setCurrentTrackUri] = useState(null);
    const accessTokenRef = useRef(null);
    const audioRef = useRef(null);  // Define audioRef here

    useEffect(() => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

        const fetchAccessToken = async () => {
            try {
                const token = await getAccessToken(clientId, clientSecret);
                accessTokenRef.current = token;
                console.log('Access token fetched:', token);
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        fetchAccessToken();
    }, []);

    const handleStartGame = async (playerName) => {
        const { player, card } = await startGame(playerName);
        setPlayer(player);
        setCards([card]);
        playSong(card.spotifyCode);
    };

    const handleAddCard = async (playerId) => {
        const card = await getCard(playerId);
        setCards([...cards, card]);
        playSong(card.spotifyCode);
    };

    const playSong = (spotifyCode) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setCurrentTrackUri(spotifyCode);
    };

    useEffect(() => {
        const fetchAndPlaySong = async () => {
            if (currentTrackUri) {
                try {
                    const trackId = currentTrackUri.split(':').pop();
                    const track = await getTrack(trackId, accessTokenRef.current);

                    if (track && track.preview_url) {
                        if (audioRef.current) {
                            audioRef.current.src = track.preview_url;
                            audioRef.current.play();
                            console.log('Playing track:', track.preview_url);
                        }
                    } else {
                        console.error('No preview URL available for this track');
                    }
                } catch (error) {
                    console.error('Error playing song:', error);
                }
            }
        };

        fetchAndPlaySong();
    }, [currentTrackUri]);

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
                        <Timeline cards={cards} />
                        <div className="button-group">
                            <GetCardButton onAddCard={() => handleAddCard(player.id)} playerId={player.id} />
                            <SubmitButton playerId={player.id} cards={cards} />
                        </div>
                    </>
                )}
                <audio ref={audioRef} />
            </main>
        </div>
    );
}

export default App;
