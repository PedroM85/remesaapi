import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getGasto = async (req, res) => {
    try {
        const Querys = 'SELECT GAT_Id,GAT_Date,GAT_SOC_Id,SOC_Name,GAT_OSB_Id,OSB_Nombre,GAT_OSBT_Id, OSBT_Nombre,GAT_Reason,\
        GAT_Amount,GAT_CreatedDateTime,GAT_ModifiedDateTime,GAT_ModifiedBy,GAT_Active FROM STD_Gastos\
        INNER JOIN OP_Socios ON STD_Gastos.GAT_SOC_Id = OP_Socios.SOC_Id\
        INNER JOIN OP_Socios_Bank ON STD_Gastos.GAT_OSB_Id = OP_Socios_Bank.OSB_Id\
        INNER JOIN OP_Socios_Bank_Type ON STD_Gastos.GAT_OSBT_Id = OP_Socios_Bank_Type.OSBT_Id'

        const [rows] = await pool.query(Querys)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
            //console.log(error.message)
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + 'Algo va mal en Gasto.controller'
        })
        //console.log(error.message)
    }

}

export const getBancoType = async (req, res) => {
    try {
        const Querys = 'SELECT * FROM OP_Socios_Bank_Type WHERE OSBT_Active = 1'

        const [rows] = await pool.query(Querys)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
            //console.log(error.message)
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + 'Algo va mal en Gasto.controller'
        })
        //console.log(error.message)
    }

}

export const postGasto = async (req, res) => {
    try {

        const { GAT_Date, GAT_SOC_Id, GAT_OSB_Id, GAT_OSBT_Id, GAT_Reason, GAT_Amount, GAT_ModifiedBy, GAT_Active } = req.body

        const Date1 = moment(GAT_Date).format("YYYY-MM-DD HH:mm:ss");
        const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        const Querys = 'INSERT INTO STD_Gastos (GAT_Date,GAT_SOC_Id,GAT_OSB_Id,GAT_OSBT_Id,GAT_Reason,GAT_Amount,\
            GAT_CreatedDateTime,GAT_ModifiedDateTime, GAT_ModifiedBy,GAT_Active) VALUES(?,?,?,?,?,?,?,?,?,?)'
        const Values = [Date1, req.body.GAT_SOC_Id, req.body.GAT_OSB_Id, req.body.GAT_OSBT_Id, req.body.GAT_Reason, req.body.GAT_Amount,
            Date2, Date2, req.body.GAT_ModifiedBy, req.body.GAT_Active]

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
            message: error.message + 'Algo va mal en Gasto.controller'
        })
    }
}

export const putGasto = async (req, res) => {
    try {

        const { GAT_Id, GAT_Date, GAT_SOC_Id, GAT_OSB_Id, GAT_OSBT_Id, GAT_Reason, GAT_Amount, GAT_ModifiedBy, GAT_Active } = req.body

        const Date1 = moment(GAT_Date).format("YYYY-MM-DD HH:mm:ss");
        const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        const Querys = 'UPDATE STD_Gastos SET GAT_Date = ?, GAT_SOC_Id = ?, GAT_OSB_Id = ?, GAT_OSBT_Id = ?, GAT_Reason = ?,\
         GAT_Amount = ?, GAT_ModifiedDateTime = ?, GAT_ModifiedBy = ?, GAT_Active = ? WHERE GAT_Id = ?'
        const Values = [Date1, req.body.GAT_SOC_Id, req.body.GAT_OSB_Id, req.body.GAT_OSBT_Id, req.body.GAT_Reason, req.body.GAT_Amount,
            Date2, req.body.GAT_ModifiedBy, req.body.GAT_Active, req.body.GAT_Id]

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
            message: error.message + 'Algo va mal en Gasto.controller'
        })
    }
}

export const delGasto = async (req, res) => {
    try {

        const { GAT_Id, GAT_ModifiedBy, GAT_Active } = req.body
        const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        const Querys = 'UPDATE STD_Gastos SET GAT_ModifiedDateTime = ?, GAT_ModifiedBy = ?, GAT_Active = ? WHERE GAT_Id = ?'
        const Values = [Date2, req.body.GAT_ModifiedBy, req.body.GAT_Active, req.body.GAT_Id]

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
            message: error.message + 'Algo va mal en Gasto.controller'
        })
    }
}