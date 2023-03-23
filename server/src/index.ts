import dotenv from 'dotenv';
import app from './app';
const https = require('https');

dotenv.config();
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`server listening on port ${port}`);
	keepSiteAlive();
});

function keepSiteAlive() {
	const url = 'https://game-haven-server.onrender.com/';

	setInterval(() => {
		https
			.get(url, (response: any) => {
				console.log(`GET request sent. Status code: ${response.statusCode}`);
				let data = '';
				response.on('data', (chunk: string) => {
					data += chunk;
				});

				response.on('end', () => {
					console.log(`JSON response: ${data}`);
				});
			})
			.on('error', (error: any) => {
				console.log(`Error occurred: ${error}`);
			});
	}, 14.5 * 60 * 1000); // 14.5 minutes in milliseconds
}
