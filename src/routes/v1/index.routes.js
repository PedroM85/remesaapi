import { Router } from "express";
import { ping, pong } from "../../controllers/index.controller.js";



const router = Router()

router.get('/ping', ping);

router.get('/pong', pong)

export default router