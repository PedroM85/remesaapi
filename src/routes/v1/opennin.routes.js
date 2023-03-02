import { Router } from "express";
import veri from "../../middleware/verification.js";
import { PostSalesDateInfo, isopenning, PostCloseSession, PostSessionInfo, PostSessionsPerSalesDate } from "../../controllers/openning.controller.js";


const router = Router()

router.post('/PostSalesDateInfo', veri, PostSalesDateInfo);

router.post('/PostSessionPerSalesDate', veri, PostSessionsPerSalesDate);

router.post('/PostCloseSession', veri, PostCloseSession);

router.post('/PostSessionInfo',veri, PostSessionInfo);

//Esto es prueba luego se debe elimiar
router.get('/isopen',veri, isopenning )
//Esto es prueba luego se debe elimiar

export default router