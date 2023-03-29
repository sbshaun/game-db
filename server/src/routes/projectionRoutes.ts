import { Router } from 'express';
import { getProjections } from '../controllers/projectionController';

const router = Router();

// dispatch the request to handler functions
router.get('/:tableName', getProjections);

export default router;
