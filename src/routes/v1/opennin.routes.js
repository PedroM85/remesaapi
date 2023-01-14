import { Router } from "express";
import  veri  from "../../middleware/verification.js";
import { getOpenning } from "../../controllers/openning.controller.js";


const router = Router()

router.post('/SalesDateInfo', veri, getOpenning);


export default router