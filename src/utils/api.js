const BASE_URL = 'http://localhost:8080/api/game';

export const startGame = async (player) => {
    const response = await fetch(`${BASE_URL}/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
    });
    return response.json();
};

export const getCard = async (playerId) => {
    const response = await fetch(`${BASE_URL}/get-card?playerId=${playerId}`);
    return response.json();
};

export const submitCard = async (playerId, cards) => {
    const response = await fetch(`${BASE_URL}/submit-card?playerId=${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cards),
    });
    return response.json();
};
