import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getGasto = async (req, res) => {
    try {
        const Querys = 'SELECT * FROM STD_Gastos WHERE GAT_Active = 1'

        const [rows] = await pool.query(Querys)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + 'Algo va mal en Gasto.controller'
        })
        //console.log(error.message)
    }

}

export const postGasto = async (req,res) => {
    try{
        
        const Date1 = moment(GAT_Date).format("YYYY-MM-DD HH:mm:ss");
        const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const {GAT_Date,GAT_Reason,GAT_Amount,GAT_ModifiedBy,GAT_Active} = req.body

        const Querys = 'INSERT INTO STD_Gastos (GAT_Date,GAT_Reason,GAT_Amount,GAT_CreatedDateTime,GAT_ModifiedDateTime,\
            GAT_ModifiedBy,GAT_Active) VALUES(?,?,?,?,?,?,?)'
        const Values = [Date1,req.body.GAT_Reason,req.body.GAT_Amount,Date2,Date2,req.body.GAT_ModifiedBy,req.body.GAT_Active]

        const [rows] = await pool.query(Querys,Values)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }

    }catch(error) {
        return res.status(401).json({
            message: error.message + 'Algo va mal en Gasto.controller'
        })
    }
}