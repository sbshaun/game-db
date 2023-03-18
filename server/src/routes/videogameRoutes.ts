import { Router } from 'express';
import {
	createVideogame,
	deleteVideogame,
	getVideogameById,
	getAllVideogames,
	updateVideogame,
} from '../controllers/videogameController';

const router = Router();

// dispatch the request to handler functions
router.get('/getAllVideoGames', getAllVideogames);
router.get('/getVideogameById:id', getVideogameById);
router.post('/createVideogame', createVideogame);
router.put('/updateVideogame:id', updateVideogame);
router.delete('/deleteVideogame:id', deleteVideogame);

export default router;
