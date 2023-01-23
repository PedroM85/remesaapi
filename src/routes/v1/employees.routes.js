import { Router } from "express";
import { createEmployee, deleteEmployee, getEmpleyee, getEmpleyees, updateEmployee } from "../../controllers/employees.controller.js";
import veri from "../../middleware/verification.js";

const router = Router()

router.get('/employees', veri, getEmpleyees)

router.get('/employees/:USR_Id', veri, getEmpleyee)

router.post('/employees', veri, createEmployee)

router.patch('/employees/:USR_Id', veri, updateEmployee)

router.delete('/employees/:USR_Id', veri, deleteEmployee)


export default router