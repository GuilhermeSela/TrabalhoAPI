function recognizeMusic() {
	var fileInput = document.getElementById('audioFile');
	var file = fileInput.files[0];
	
	if (file) {
	  var formData = new FormData();
	  formData.append('file', file);
	  formData.append('return', 'apple_music,spotify');
	  formData.append('api_token', 'cc717f4e7cbcf8a9a3ed7a4d175e69b5');
  
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
	  var spotifyLink = song.spotify.external_urls.spotify;
	  var appleMusicLink = song.apple_music.url;
	  var releaseDate = song.release_date;
	  var album = song.album;
	  var duration = formatDuration(song.apple_music.durationInMillis);
	  var albumArtwork = song.apple_music.artwork.url;
  
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
		resultDiv.appendChild(spotifyLinkElement);
	  }
  
	  if (appleMusicLink) {
		var appleMusicLinkElement = document.createElement('a');
		appleMusicLinkElement.textContent = 'Link do Apple Music';
		appleMusicLinkElement.href = appleMusicLink;
		appleMusicLinkElement.target = '_blank';
		resultDiv.appendChild(appleMusicLinkElement);
	  }
	} else {
	  resultDiv.textContent = 'Não foi possível reconhecer a música.';
	}
  }


function formatDuration(durationInMillis) {
  var seconds = Math.floor(durationInMillis / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
