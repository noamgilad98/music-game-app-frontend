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
        console.error('Failed to fetch access token:', response);
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    return data.access_token;
};

export const getTrack = async (trackId, accessToken) => {
    const url = `https://api.spotify.com/v1/tracks/${trackId}`;
    const headers = new Headers({
        'Authorization': 'Bearer ' + accessToken,
    });

    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        console.error('Failed to fetch track:', response);
        throw new Error('Failed to fetch track');
    }

    const data = await response.json();
    console.log('Track data:', data);
    return data;
};
