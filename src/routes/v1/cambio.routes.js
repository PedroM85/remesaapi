import { Router } from "express";
import { getCambios, getStatus, postCambio, putCambio } from "../../controllers/cambio.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()

router.get('/GetCambio', veri, getCambios)

router.get('/GetStatus', veri, getStatus)

router.post('/CreateCambio', veri, postCambio)

router.put('/UpdateCambio',veri, putCambio)

export default router