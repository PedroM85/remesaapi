import { Router } from "express";
import veri from "../../middleware/verification.js";
import { PostCloseSalesDate, PostOpenSalesDate, PostReOpenSession, PostSessionInfo } from "../../controllers/salessession.controller.js";


const router = Router()

router.post('/PostSessionInfo', veri, PostSessionInfo)

router.post('/PostCloseSalesDate', veri, PostCloseSalesDate)

router.post('/PostOpenSalesDate', veri, PostOpenSalesDate)

router.post('/PostReOpenSalesDate', veri, PostReOpenSession)


export default router