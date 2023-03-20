import { Router } from 'express';
import {
	createVoiceActor,
	deleteVoiceActor,
	getAllVoiceActors,
	getVoiceActorById,
	updateVoiceActor,
} from '../controllers/voiceActorController';

const router = Router();

router.get('/getAllVoiceActors', getAllVoiceActors);
router.get('/:id', getVoiceActorById);
router.post('/createVoiceActor', createVoiceActor);
router.put('/updateVoiceActor/:id', updateVoiceActor);
router.delete('/:id', deleteVoiceActor);

export default router;
