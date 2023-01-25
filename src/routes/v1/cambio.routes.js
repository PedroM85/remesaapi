import { Router } from "express";
import { getCambios } from "../../controllers/cambio.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()

router.get('/GetCambio', veri, getCambios)

export default router