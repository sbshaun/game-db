import { Router } from 'express';
import {
	createVideogame,
	deleteVideogame,
	getVideogameByName,
	getAllVideogames,
	updateVideogame,
} from '../controllers/videogameController';

const router = Router();

// dispatch the request to handler functions
router.get('/', getAllVideogames);
router.get('/:name', getVideogameByName);
router.post('/', createVideogame);
router.put('/:name', updateVideogame);
router.delete('/:name', deleteVideogame);

export default router;
