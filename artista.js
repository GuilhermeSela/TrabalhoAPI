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
            fetchEventDetails(artist.id);
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

function fetchEventDetails(artistId) {
    const apiKey = 'V7RMLICYZxiGuLz2w2HRi8aKwG2tCgjP';
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&attractionId=${artistId}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data._embedded && data._embedded.events) {
            displayEventDetails(data._embedded.events);
        }
    })
    .catch(error => {
        console.error('Erro ao buscar detalhes dos eventos:', error);
    });
}

function fetchEventImages(eventId, listItem) {
    const apiKey = 'V7RMLICYZxiGuLz2w2HRi8aKwG2tCgjP';
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}/images.json?apikey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data._embedded && data._embedded.images) {
            const eventImage = data._embedded.images[0].url;
            const eventImageElement = document.createElement('img');
            eventImageElement.src = eventImage;
            eventImageElement.style.width = '100%';
            eventImageElement.style.borderRadius = '5px';
            listItem.appendChild(eventImageElement);
        }
    })
    .catch(error => {
        console.error('Erro ao buscar imagens do evento:', error);
    });
}

function displayEventDetails(events) {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${event.name} - ${new Date(event.dates.start.dateTime).toLocaleString()}
            <br><button class="ticket-button" onclick="window.open('${event.url}', '_blank')">Comprar Ingressos</button>
        `;
        eventList.appendChild(listItem);

        fetchEventImages(event.id, listItem); 
    });
}

