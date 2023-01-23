import { Router } from "express";
import { DelSocio, getSocio, postSocio, putSocio } from "../../controllers/socio.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()

router.get('/GetSocios', veri, getSocio)

router.post('/CreateSocio', veri, postSocio)

router.put('/UpdateSocio', veri, putSocio)

router.put('/DeleteSocio', veri, DelSocio)

export default router