import { Router } from 'express';
import * as controller from "../controllers/FranchiseController";

const router = Router();


router.post("/franchises", controller.getAllFranchises);
router.get("/franchises/:franchiseName/characters", controller.getCharactersFromFranchise)

export default router;