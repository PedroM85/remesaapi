import { Router } from "express";
import { delBanco, getAccountTyoe, getBancoId, getBancos, postBanco, putBanco } from "../../controllers/banco.controller.js";
import veri from "../../middleware/verification.js";



const router = Router()


router.get('/GetBancos', veri, getBancos)

router.get('/GetBanco/:BAN_Id', veri, getBancoId)

router.get('/GetAccountType',veri, getAccountTyoe)

router.post('/CreateBanco', veri, postBanco)

router.put('/UpdateBanco', veri, putBanco)

router.put('/DeleteBanco', veri, delBanco)


export default router