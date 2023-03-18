import express, { Express } from 'express';
import bodyParser from 'body-parser';
import videogameRoutes from './routes/videogameRoutes';
import cors from 'cors';

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

// test route, delete later
app.get('/', (req, res) => {
	return res.status(200).json({ message: 'ok' });
});

// dispatch requests to routes
app.use('/videogame', videogameRoutes);
// ... TODO: more routes

export default app;
