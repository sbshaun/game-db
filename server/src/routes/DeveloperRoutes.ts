import {Router} from 'express';
import {
	deleteDeveloper,
	projectDevelopers,
	projectIndividualDevelopers,
	projectStudios, getIndividualDeveloper, getStudio, getDeveloper,
} from "../controllers/DeveloperController";

const router = Router();

router.post("/developers/project", projectDevelopers);
router.post("/studios/project", projectStudios);
router.post("/indiedevelopers/project", projectIndividualDevelopers);

router.get("/developers/:name", getDeveloper);
router.get("/studios/:name", getStudio);
router.get("/indiedevelopers/:name", getIndividualDeveloper);

router.delete("/developers/:name", deleteDeveloper);

export default router;