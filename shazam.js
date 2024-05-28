function recognizeMusic() {
  var fileInput = document.getElementById('audioFile');
  var file = fileInput.files[0];
  
  if (file) {
      var formData = new FormData();
      formData.append('file', file);
      formData.append('return', 'apple_music,spotify');
      formData.append('api_token', 'c63387de24eed85c73acde3ecc004a56');

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.audd.io/', true);

      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  var response = JSON.parse(xhr.responseText);
                  displayResult(response);
              } else {
                  console.error('Erro ao reconhecer música: ' + xhr.status);
              }
          }
      };

      xhr.send(formData);
  } else {
      console.error('Selecione um arquivo de áudio.');
  }
}

function displayResult(response) {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  
  if (response.status === 'success') {
      var song = response.result;

      var artist = song.artist;
      var title = song.title;
      var spotifyLink = song.spotify && song.spotify.external_urls && song.spotify.external_urls.spotify;
      var appleMusicLink = song.apple_music && song.apple_music.url;
      var releaseDate = song.release_date;
      var album = song.album;
      var duration = formatDuration(song.apple_music && song.apple_music.durationInMillis);
      var albumArtwork = song.apple_music && song.apple_music.artwork && song.apple_music.artwork.url;

      // Substituindo {w} e {h} na URL da imagem
      if (albumArtwork) {
          albumArtwork = albumArtwork.replace('{w}', '500').replace('{h}', '200');
      }

      var artistElement = document.createElement('p');
      artistElement.textContent = 'Artista: ' + artist;
      resultDiv.appendChild(artistElement);
      
      var titleElement = document.createElement('p');
      titleElement.textContent = 'Título: ' + title;
      resultDiv.appendChild(titleElement);
      
      var releaseDateElement = document.createElement('p');
      releaseDateElement.textContent = 'Data de Lançamento: ' + releaseDate;
      resultDiv.appendChild(releaseDateElement);
      
      var albumElement = document.createElement('p');
      albumElement.textContent = 'Álbum: ' + album;
      resultDiv.appendChild(albumElement);
      
      var durationElement = document.createElement('p');
      durationElement.textContent = 'Duração: ' + duration;
      resultDiv.appendChild(durationElement);
      
      if (spotifyLink) {
          var spotifyLinkElement = document.createElement('a');
          spotifyLinkElement.textContent = 'Link do Spotify';
          spotifyLinkElement.href = spotifyLink;
          spotifyLinkElement.target = '_blank';
          spotifyLinkElement.style.display = 'block';
          spotifyLinkElement.style.textAlign = 'center';
          resultDiv.appendChild(spotifyLinkElement);
      }
      
      if (appleMusicLink) {
          var appleMusicLinkElement = document.createElement('a');
          appleMusicLinkElement.textContent = 'Link do Apple Music';
          appleMusicLinkElement.href = appleMusicLink;
          appleMusicLinkElement.target = '_blank';
          appleMusicLinkElement.style.display = 'block';
          appleMusicLinkElement.style.textAlign = 'center';
          resultDiv.appendChild(appleMusicLinkElement);
      }

      // Adicionando a imagem do álbum abaixo dos links
      if (albumArtwork) {
          var albumArtworkElement = document.createElement('img');
          albumArtworkElement.src = albumArtwork;
          albumArtworkElement.alt = 'Capa do Álbum';
          albumArtworkElement.style.display = 'block';
          albumArtworkElement.style.margin = '10px auto'; // Centralizar a imagem
          resultDiv.appendChild(albumArtworkElement);
      }
      
  } else {
      resultDiv.textContent = 'Não foi possível reconhecer a música.';
  }
}

function formatDuration(durationInMillis) {
  if (!durationInMillis) return 'N/A';
  var seconds = Math.floor(durationInMillis / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
