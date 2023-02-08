import { Router } from "express";
import veri from "../../middleware/verification.js";
import { PostCloseSalesDate, PostOpenSalesDate, PostSessionInfo } from "../../controllers/salessession.controller.js";


const router = Router()

router.post('/PostSessionInfo', veri, PostSessionInfo)

router.get('/PostCloseSalesDate', veri, PostCloseSalesDate)

router.post('/PostOpenSalesDate', veri, PostOpenSalesDate)


export default router