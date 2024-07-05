const API_URL = 'http://localhost:8080'; // Adjust the port if necessary

export const getAccessToken = async (clientId, clientSecret) => {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = new Headers({
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams({
        'grant_type': 'client_credentials',
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body.toString(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    return data.access_token;
};

export const startGame = async (playerName) => {
    console.log(`Starting game for player: ${playerName}`);
    const response = await fetch(`${API_URL}/api/game/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName }),
    });
    if (!response.ok) {
        console.error('Failed to start game');
        throw new Error('Failed to start game');
    }
    console.log(`Game started successfully for player: ${playerName}`);
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

export const submitAndValidate = async (playerId, card) => {
    const response = await fetch(`${API_URL}/api/game/submit-and-validate?playerId=${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    });
    if (!response.ok) {
        throw new Error('Failed to submit and validate card');
    }
    return response.json();
};
