import { Router } from "express";
//import jwt from "jsonwebtoken";
import { createEmployee,deleteEmployee,getEmpleyee,getEmpleyees,updateEmployee } from "../../controllers/employees.controller.js";

const router = Router()

router.get('/employees', getEmpleyees)

router.get('/employees/:USR_Id', getEmpleyee)

router.post('/employees', createEmployee)

router.patch('/employees/:USR_Id', updateEmployee)

router.delete('/employees/:USR_Id', deleteEmployee)


export default router