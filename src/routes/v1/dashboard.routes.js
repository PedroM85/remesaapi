import { Router } from "express";
import { getCambiosDiarios } from "../../controllers/dashboard.controller.js";
import  veri  from "../../middleware/verification.js";

const router = Router()

router.post('/GetDashboard', veri, getCambiosDiarios)

export default router