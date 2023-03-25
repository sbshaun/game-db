import { Router } from 'express';
import * as controller from "../controllers/FranchiseController";

const router = Router();


router.post("/franchises", controller.getAllFranchises);

export default router;