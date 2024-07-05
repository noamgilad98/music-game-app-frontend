// src/utils/api.js
const API_URL = 'http://localhost:8080';

export const startGame = async (playerName) => {
    const response = await fetch(`${API_URL}/api/game/start-game`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName }),
    });
    if (!response.ok) {
        throw new Error('Failed to start game');
    }
    return response.json();
};

export const getCard = async (playerId) => {
    const response = await fetch(`${API_URL}/api/game/get-card?playerId=${playerId}`);
    if (!response.ok) {
        throw new Error('Failed to get card');
    }
    return response.json();
};

export const submitCard = async (playerId, card) => {
    const response = await fetch(`${API_URL}/api/game/submit-card?playerId=${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    });
    if (!response.ok) {
        throw new Error('Failed to submit card');
    }
    return response.json();
};

export const submitTimeline = async (playerId, timeline) => {
    const response = await fetch(`${API_URL}/api/game/submit-timeline?playerId=${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeline),
    });
    if (!response.ok) {
        throw new Error('Failed to submit timeline');
    }
    return response.json();
};

export const submitAndValidate = async (playerId, card) => {
    const response = await fetch(`${API_URL}/api/game/submit-and-validate?playerId=${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    });
    if (!response.ok) {
        throw new Error('Failed to submit and validate');
    }
    return response.json();
};
