function searchArtist() {
    const artistName = document.getElementById('artistName').value;
    const apiKey = 'V7RMLICYZxiGuLz2w2HRi8aKwG2tCgjP';
    const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${apiKey}&keyword=${artistName}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const artist = data._embedded.attractions[0];
        if (artist) {
            displayArtistInfo(artist);
            fetchSpotifyData(artist.name);
        } else {
            alert('Artista não encontrado.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar artista:', error);
        alert('Erro ao buscar artista. Por favor, tente novamente mais tarde.');
    });
}

function displayArtistInfo(artist) {
    const artistNameDisplay = document.getElementById('artistNameDisplay');
    const artistGenre = document.getElementById('artistGenre');
    const artistImage = document.getElementById('artistImage');
    const artistInfo = document.getElementById('artistInfo');

    artistNameDisplay.textContent = artist.name;
    artistGenre.textContent = `Gênero: ${artist.classifications[0].genre.name}`;
    artistImage.src = artist.images[0].url;

    artistInfo.style.display = 'block';
}

function fetchSpotifyData(artistName) {
    const spotifyApiKey = 'd4b1806bf06540b89ac38b95faccaa26';
    const spotifyUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;

    fetch(spotifyUrl, {
        headers: {
            'Authorization': 'Bearer ' + spotifyApiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const artist = data.artists.items[0];
        if (artist) {
            displayTopTrack(artist);
        } else {
            console.error('Artista não encontrado no Spotify.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar dados do Spotify:', error);
    });
}

function displayTopTrack(artist) {
    const topTrack = artist.top_track;
    const topTrackDisplay = document.getElementById('topTrack');

    if (topTrack) {
        topTrackDisplay.textContent = `Música mais famosa: ${topTrack.name}`;
    } else {
        console.error('Música mais famosa não encontrada.');
    }
}
