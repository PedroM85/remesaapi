import { Router } from "express";
import veri from "../../middleware/verification.js";
import { GetSalesDateInfo, PostSessionsPerSalesDate } from "../../controllers/openning.controller.js";


const router = Router()

router.get('/GetSalesDateInfo', veri, GetSalesDateInfo);

router.post('/GetSessionSalesDate', veri, PostSessionsPerSalesDate)


export default router