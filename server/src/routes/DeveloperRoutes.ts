import {Router} from 'express';
import {
	getIndividualDeveloper,
	getIndividualDeveloperNames,
	getStudio,
	getStudioNames
} from "../controllers/DeveloperController";

const router = Router();

router.get("/studios", getStudioNames);
router.get("/studios/:name", getStudio);

router.get("/indiedevelopers", getIndividualDeveloperNames);
router.get("/indiedevelopers/:name", getIndividualDeveloper);


export default router;