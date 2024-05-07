const searchBtn = document.getElementById('searchBtn');
const artistNameInput = document.getElementById('artistName');
const artistInfoDiv = document.getElementById('artistInfo');

searchBtn.addEventListener('click', () => {
    const artistName = artistNameInput.value.trim();

    if (artistName !== '') {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                const data = JSON.parse(this.responseText);
                if (data.length > 0) {
                    const artist = data[0]; // Assuming the first result is the most relevant
                    renderArtistInfo(artist);
                } else {
                    artistInfoDiv.innerHTML = '<p>Nenhum artista encontrado com esse nome.</p>';
                }
            }
        });

        xhr.open('GET', `https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=${artistName}&page=1`);
        xhr.setRequestHeader('X-RapidAPI-Key', 'ebe6f92aa8msh057782af95aa5b1p1188afjsn0ad6eb97d521'); // Substitua 'SUA-CHAVE-AQUI' pela sua chave real
        xhr.setRequestHeader('X-RapidAPI-Host', 'concerts-artists-events-tracker.p.rapidapi.com');

        xhr.send();
    } else {
        artistInfoDiv.innerHTML = '<p>Por favor, insira o nome do artista.</p>';
    }
});

function renderArtistInfo(artist) {
    const artistInfoHTML = `
        <h2>${artist.name}</h2>
        <p>Gênero: ${artist.genre}</p>
        <p>Popularidade: ${artist.popularity}</p>
        <img src="${artist.image}" alt="${artist.name}">
    `;
    artistInfoDiv.innerHTML = artistInfoHTML;
}
