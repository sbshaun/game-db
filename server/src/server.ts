import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
const port = process.env.SERVER_PORT;

const app: Express = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
