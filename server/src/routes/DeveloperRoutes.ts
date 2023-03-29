import {Router} from 'express';
import {
	getDeveloper,
	getDeveloperNames,
	getIndividualDeveloper,
	getIndividualDeveloperNames,
	getStudio,
	getStudioNames
} from "../controllers/DeveloperController";

const router = Router();

router.get("/developers", getDeveloperNames);
router.get("/developers/:name", getDeveloper);

router.get("/studios", getStudioNames);
router.get("/studios/:name", getStudio);

router.get("/indiedevelopers", getIndividualDeveloperNames);
router.get("/indiedevelopers/:name", getIndividualDeveloper);


export default router;