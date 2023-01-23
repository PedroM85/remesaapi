import { Router } from "express";
import { delCliente, getCliente, getClienteId, postCliente, putCliente } from "../../controllers/cliente.controller.js";



const router = Router()


router.get('/GetCliente', getCliente)

router.get('/GetClientes/:USR_Id', getClienteId)

router.post('/CreateCliente', postCliente)

router.patch('/UpdateCliente/:USR_Id', putCliente)

router.delete('/DeleteCliente/:USR_Id', delCliente)


export default router