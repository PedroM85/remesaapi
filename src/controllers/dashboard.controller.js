import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getCambiosDiarios = async (req, res) => {
    try {
        const { OP_DateStart, OP_DateEnd } = req.body
        console.log(req.body)

        const DateStart = moment(req.body.OP_DateStart).format("YYYY-MM-DD 00:00:00")
        console.log(DateStart)
        const DateEnd = moment(req.body.OP_DateEnd).format("YYYY-MM-DD 23:59:59")
        console.log(DateEnd)
        
        const Querys = 'SELECT DATE(op_date) AS OP_Fecha, OP_Socio, SUM(op_pesos) AS OP_Pesos from OP_Remesas\
                        WHERE OP_Date BETWEEN ? AND ? GROUP BY OP_Fecha, OP_Socio'
        const Values = [DateStart, DateEnd]    
        console.log(Querys)
        console.log(Values)
        // const Querys = 'SELECT * FROM CLI_Bank WHERE BAN_Active = 1'
        const [rows] = await pool.query(Querys, Values)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en Banco.controller'
        })
    }

}