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

