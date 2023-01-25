import { Router } from "express";
import { delCliente, getCliente, getClienteId, postCliente, putCliente } from "../../controllers/cliente.controller.js";
import  veri  from "../../middleware/verification.js";


const router = Router()


router.get('/GetClientes', veri, getCliente)

router.get('/GetClientes', veri, getClienteId)

router.post('/CreateCliente', veri, postCliente)

router.put('/UpdateCliente', veri, putCliente)

router.delete('/DeleteCliente', veri, delCliente)


export default router