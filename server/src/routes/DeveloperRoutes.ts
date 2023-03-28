import {Router} from 'express';
import {
	getAllDevelopers,
	getAllIndividualDevelopers,
	getAllStudios,
	getStudiosByCountry
} from "../controllers/DeveloperController";

const router = Router();

router.post("/developers", getAllDevelopers);
router.post("/studios", getAllStudios);
router.post("/studios/:country", getStudiosByCountry);
router.post("/indiedevelopers", getAllIndividualDevelopers);

export default router;