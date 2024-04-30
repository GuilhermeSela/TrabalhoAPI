// Array para armazenar músicas adicionadas à playlist
let playlist = [];

function searchArtists() {
    const searchInput = document.getElementById("searchInput").value;

    // Limpa o container de artistas
    document.getElementById("artistContainer").innerHTML = "";

    // Faz uma solicitação à API de música (substitua 'API_KEY' e 'API_ENDPOINT' com suas próprias informações)
    fetch(`API_ENDPOINT?q=${searchInput}&api_key=API_KEY`)
        .then(response => response.json())
        .then(data => {
            // Processa os resultados da busca
            data.results.forEach(artist => {
                // Cria um elemento de artista
                const artistElement = document.createElement("div");
                artistElement.classList.add("artist");
                artistElement.innerHTML = `
                    <h2>${artist.name}</h2>
                    <p>${artist.genre}</p>
                    <p>${artist.description}</p>
                    <button onclick="getAlbums(${artist.id})">Ver Álbuns</button>
                `;
                // Adiciona o elemento de artista ao container de artistas
                document.getElementById("artistContainer").appendChild(artistElement);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar artistas:", error);
        });
}

function getAlbums(artistId) {
    // Limpa o container de artistas
    document.getElementById("artistContainer").innerHTML = "";

    // Faz uma solicitação à API de música para obter os álbuns do artista
    fetch(`API_ENDPOINT/albums?artist_id=${artistId}&api_key=API_KEY`)
        .then(response => response.json())
        .then(data => {
            // Processa os resultados dos álbuns
            data.albums.forEach(album => {
                // Cria um elemento de álbum
                const albumElement = document.createElement("div");
                albumElement.classList.add("album");
                albumElement.innerHTML = `
                    <h3>${album.title}</h3>
                    <img src="${album.cover}" alt="Capa do Álbum">
                    <button onclick="getTracks(${album.id})">Ver Músicas</button>
                `;
                // Adiciona o elemento de álbum ao container de artistas
                document.getElementById("artistContainer").appendChild(albumElement);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar álbuns:", error);
        });
}

function getTracks(albumId) {
    // Limpa o container de artistas
    document.getElementById("artistContainer").innerHTML = "";

    // Faz uma solicitação à API de música para obter as faixas do álbum
    fetch(`API_ENDPOINT/tracks?album_id=${albumId}&api_key=API_KEY`)
        .then(response => response.json())
        .then(data => {
            // Processa os resultados das faixas
            data.tracks.forEach(track => {
                // Cria um elemento de faixa
                const trackElement = document.createElement("div");
                trackElement.classList.add("track");
                trackElement.innerHTML = `
                    <h4>${track.title}</h4>
                    <p>${track.duration}</p>
                    <button onclick="playTrack('${track.preview}')">Reproduzir</button>
                `;
                // Adiciona o elemento de faixa ao container de artistas
                document.getElementById("artistContainer").appendChild(trackElement);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar faixas:", error);
        });
}

function playTrack(previewUrl) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = previewUrl;
    audioPlayer.play();
}

function addToPlaylist() {
    const audioPlayer = document.getElementById("audioPlayer");
    const currentTrack = {
        title: audioPlayer.title,
        src: audioPlayer.src
    };
    playlist.push(currentTrack);

    // Atualiza a exibição da lista de reprodução
    displayPlaylist();
}

function displayPlaylist() {
    const playlistElement = document.getElementById("playlist");
    // Limpa a lista de reprodução atual
    playlistElement.innerHTML = "";
    
    // Adiciona cada música da playlist à lista
    playlist.forEach(track => {
        const trackItem = document.createElement("li");
        trackItem.textContent = track.title;
        playlistElement.appendChild(trackItem);
    });
}
