import {Router} from "express";
import {getAllCharacters} from "../controllers/CharacterController";

const router = Router();

router.post("/characters", getAllCharacters);

export default router;

