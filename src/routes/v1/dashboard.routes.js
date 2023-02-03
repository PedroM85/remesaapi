import { Router } from "express";
import { getCambiosDiarios, getTotalMensual } from "../../controllers/dashboard.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()

router.post('/PostDashboard', veri, getCambiosDiarios)

router.get('/TotalInfo',veri, getTotalMensual)



export default router