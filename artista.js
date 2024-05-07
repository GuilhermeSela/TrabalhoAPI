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
