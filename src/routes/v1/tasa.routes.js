import { Router } from "express";
import { getTasa , postTasa} from "../../controllers/tasa.controller.js";
import  veri  from "../../middleware/verification.js";


const router = Router()

router.get('/GetTasas', veri, getTasa);

router.post('/CreateTasa', veri, postTasa);


export default router