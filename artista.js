// Função para buscar informações do artista na Ticketmaster
function searchArtist() {
    const artistName = document.getElementById('artistName').value;
    const apiKey = 'V7RMLICYZxiGuLz2w2HRi8aKwG2tCgjP';
    const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${apiKey}&keyword=${artistName}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const artist = data._embedded && data._embedded.attractions ? data._embedded.attractions[0] : null;
        if (artist) {
            displayArtistInfo(artist);
            fetchEventDetails(artist.id); // Buscar detalhes dos eventos
            fetchGenreDetails(artist.classifications[0].genre.id); // Buscar detalhes do gênero
            fetchArtistSingles(); // Buscar singles do artista
            fetchPlaylistTracks(); // Buscar faixas da playlist
        } else {
            alert('Artista não encontrado.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar artista:', error);
        alert('Erro ao buscar artista. Por favor, tente novamente mais tarde.');
    });
}

// Função para exibir informações do artista
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

// Função para buscar detalhes dos eventos do artista
function fetchEventDetails(artistId) {
    const apiKey = 'V7RMLICYZxiGuLz2w2HRi8aKwG2tCgjP';
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&attractionId=${artistId}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data._embedded && data._embedded.events) {
            displayEventDetails(data._embedded.events);
            const eventId = data._embedded.events[0].id; // Pegando o ID do primeiro evento para buscar imagens
            fetchEventImages(eventId); // Buscar imagens do evento
        }
    })
    .catch(error => {
        console.error('Erro ao buscar detalhes dos eventos:', error);
    });
}

// Função para exibir detalhes dos eventos
function displayEventDetails(events) {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.name} - ${new Date(event.dates.start.dateTime).toLocaleString()}`;
        eventList.appendChild(listItem);
    });
}

// Função para buscar detalhes de um gênero específico
function fetchGenreDetails(genreId) {
    const apiKey = 'V7RMLICYZxiGuLz2w2HRi8aKwG2tCgjP';
    const url = `https://app.ticketmaster.com/discovery/v2/classifications/genres/${genreId}.json?apikey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('Detalhes do gênero:', data);
        // Você pode adicionar mais lógica aqui para exibir detalhes do gênero, se necessário
    })
    .catch(error => {
        console.error('Erro ao buscar detalhes do gênero:', error);
    });
}

function fetchEventImages(eventId) {
    const apiKey = 'V7RMLICYZxiGuLz2w2HRi8aKwG2tCgjP';
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}/images.json?apikey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('Imagens do evento:', data); // Verifica a resposta da API
        // Adicione código para manipular as imagens aqui
    })
    .catch(error => {
        console.error('Erro ao buscar imagens do evento:', error);
    });
}

// Função para buscar singles do artista específico
function fetchArtistSingles() {
    const options = {
        method: 'GET',
        url: 'https://spotify-web2.p.rapidapi.com/artist_singles/',
        params: {
            id: '2w9zwq3AktTeYYMuhMjju8',
            offset: '0',
            limit: '20'
        },
        headers: {
            'X-RapidAPI-Key': 'ebe6f92aa8msh057782af95aa5b1p1188afjsn0ad6eb97d521',
            'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
        }
    };

    axios.request(options)
    .then(response => {
        displayArtistSingles(response.data);
    })
    .catch(error => {
        console.error('Erro ao buscar singles do artista:', error);
    });
}

// Função para exibir singles do artista
function displayArtistSingles(data) {
    const trackList = document.getElementById('trackList');
    trackList.innerHTML = '';

    data.tracks.slice(0, 5).forEach(track => { // Exibindo apenas os primeiros 5 singles
        const listItem = document.createElement('li');
        listItem.textContent = `${track.name}`;
        trackList.appendChild(listItem);
    });
}
