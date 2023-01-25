import { Router } from "express";
import { delCliente, getCliente, getClienteId, postCliente, putCliente } from "../../controllers/cliente.controller.js";
import  veri  from "../../middleware/verification.js";


const router = Router()


router.get('/GetClientes', veri, getCliente)

router.get('/GetClientes/:USR_Id', veri, getClienteId)

router.post('/CreateCliente', veri, postCliente)

router.patch('/UpdateCliente/:USR_Id', veri, putCliente)

router.delete('/DeleteCliente/:USR_Id', veri, delCliente)


export default router