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
                `;
                // Adiciona o elemento de artista ao container de artistas
                document.getElementById("artistContainer").appendChild(artistElement);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar artistas:", error);
        });
}
