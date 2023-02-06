import { Router } from "express";
import { delBancosSO, getBancosSO, getBancosType, postBancosSO, putBancosSO } from "../../controllers/bancoso.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()


router.get('/GetBancoSo', veri, getBancosSO)

router.get('/GetBancoSoType', veri, getBancosType)

router.post('/CreateBancoSo', veri, postBancosSO)

router.put('/UpdateBancoSo', veri, putBancosSO)

router.put('/DeleteBancoSo', veri, delBancosSO)

export default router