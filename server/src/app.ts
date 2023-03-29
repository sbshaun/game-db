import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import videogameRoutes from './routes/videogameRoutes';
import voiceActorRoutes from './routes/voiceActorRoutes';

import developerRoutes from './routes/DeveloperRoutes';
import characterRoutes from './routes/CharacterRoutes';
import projectionRoutes from './routes/projectionRoutes';

const app: Express = express();
app.use(
	cors({
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);
app.use(bodyParser.json());

// test route, delete later
app.get('/', (req, res) => {
	return res.status(200).json({ message: 'ok' });
});

// dispatch requests to routes
app.use('/projections', projectionRoutes);
app.use('/videogame', videogameRoutes);
app.use('/voiceactor', voiceActorRoutes);
app.use('', developerRoutes);
app.use('', characterRoutes);
// ... TODO: more routes

export default app;
