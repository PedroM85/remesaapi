import { Router } from "express";
import veri from "../../middleware/verification.js";
import { getSalesDateInfo, PostSessionsPerSalesDate } from "../../controllers/openning.controller.js";


const router = Router()

router.get('/GetSalesDateInfo', veri, getSalesDateInfo);

router.post('/GetSessionSalesDate', veri, PostSessionsPerSalesDate)


export default router