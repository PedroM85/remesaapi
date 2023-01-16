import { Router } from "express";
import { getTasa } from "../../controllers/tasa.controller.js";
import  veri  from "../../middleware/verification.js";


const router = Router()

router.get('/GetTasas', veri, getTasa);


export default router