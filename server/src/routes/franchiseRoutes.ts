import { Router } from 'express';
import {getFranchiseNames, getCharactersFromFranchise} from "../controllers/FranchiseController";

const router = Router();


router.get("/franchises/names", getFranchiseNames);
router.get("/franchises/:franchiseName/characters", getCharactersFromFranchise)

export default router;