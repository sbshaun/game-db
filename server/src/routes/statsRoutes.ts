import { Router } from 'express';
import {getSalesMeasurement} from "../controllers/StatsController";

const router = Router();

router.get("/stats/:group/sales/:measurement", getSalesMeasurement);
// router.post("/stats/:group/count");

export default router;