import { Router } from "express";
import { getGasto } from "../../controllers/gasto.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()

router.get('/gasto', veri, getGasto)
export default router