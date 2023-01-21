import { Router } from "express";
import { deleteTasa, getTasa ,  postTasa, putTasa} from "../../controllers/tasa.controller.js";
import  veri  from "../../middleware/verification.js";


const router = Router()

router.get('/GetTasas', veri, getTasa);

router.post('/CreateTasa', veri, postTasa);

router.put('/UpdateTasa',veri, putTasa);

router.put('/DeleteTasa',veri, deleteTasa)


export default router