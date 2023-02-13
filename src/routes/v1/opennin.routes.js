import { Router } from "express";
import veri from "../../middleware/verification.js";
import { GetSalesDateInfo, PostCloseSession, PostSessionInfo, PostSessionsPerSalesDate } from "../../controllers/openning.controller.js";


const router = Router()

router.get('/GetSalesDateInfo', veri, GetSalesDateInfo);

router.post('/PostSessionPerSalesDate', veri, PostSessionsPerSalesDate);

router.post('/PostCloseSession', veri, PostCloseSession);

router.post('/PostSessionInfo',veri, PostSessionInfo);


export default router