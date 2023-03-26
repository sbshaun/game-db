import { Router } from 'express';
import {countGroups, getSalesMeasurement} from "../controllers/StatsController";

const router = Router();

router.get("/stats/:group/sales/:measurement", getSalesMeasurement);
router.post("/stats/:group/count", countGroups);

export default router;