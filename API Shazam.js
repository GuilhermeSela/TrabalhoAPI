const http = require('https');

const options = {
	method: 'GET',
	hostname: 'shazam-core.p.rapidapi.com',
	port: null,
	path: '/v1/search/multi?query=metallica&search_type=SONGS_ARTISTS',
	headers: {
		'X-RapidAPI-Key': 'ccfd0693e5msh7c2cefbeb880f4fp1466e6jsn99d2b10af091',
		'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();