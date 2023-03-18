import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connection } from '../api/database';
dotenv.config();
const port = process.env.SERVER_PORT;

const app: Express = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.get('/getvideogames', (req: Request, res: Response) => {
	connection.query('SELECT * FROM videogame', function (err, results, fields) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(results);
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
