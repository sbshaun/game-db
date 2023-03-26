import { Router } from 'express';
import {getAllFranchises, getCharactersFromFranchise} from "../controllers/FranchiseController";

const router = Router();


router.post("/franchises", getAllFranchises);
router.get("/franchises/:franchiseName/characters", getCharactersFromFranchise)

export default router;