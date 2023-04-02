import { Router } from 'express';
import {countGroups, getSalesMeasurement, getSalesMeasurementExtrema} from "../controllers/StatsController";

const router = Router();

router.get("/:group/sales/:measurement", getSalesMeasurement);
router.post("/:group/count", countGroups);
router.get("/:group/sales/:measurement/:extrema", getSalesMeasurementExtrema);

export default router;