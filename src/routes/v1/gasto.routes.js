import { Router } from "express";
import { delGasto, getBancoType, getGasto, postGasto, putGasto } from "../../controllers/gasto.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()

router.get('/GetGasto', veri, getGasto)

router.get('/GetBancoType', veri, getBancoType)

router.post('/CreateGasto', veri, postGasto)

router.put('/UpdateGasto', veri, putGasto)

router.put('/DeleteGasto', veri, delGasto)

export default router