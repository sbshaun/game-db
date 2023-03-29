import { Router } from 'express';
import {getFranchiseNames, getCharactersFromFranchise} from "../controllers/FranchiseController";

const router = Router();


router.get("/names", getFranchiseNames);
router.get("/:franchiseName/characters", getCharactersFromFranchise)

export default router;