import { Router } from 'express';
import {countGroups, getSalesMeasurement, getSalesMeasurementExtrema} from "../controllers/StatsController";

const router = Router();

router.get("/stats/:group/sales/:measurement", getSalesMeasurement);
router.post("/stats/:group/count", countGroups);
router.get("/stats/:group/sales/:measurement/:extrema", getSalesMeasurementExtrema);

export default router;