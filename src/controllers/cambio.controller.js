import { pool } from "../db/db.js";
import moment from "moment-timezone"


export const getCambios = async (req, res) => {
    try {
        const Querys =
            'SELECT OP_Id, OP_Date,OP_Socio,OP_Socios.SOC_Name,OP_Cliente, CLI_Data.CLI_Nombre,OP_Pesos,OP_Tasa_id,\
        OP_Tasa.TAS_TasaCliente,OP_USTDBuy,OP_USTDSell,(OP_USTDBuy-OP_USTDSell)AS OP_Resta,OP_Status_Id,\
        SYS_Status.STA_Name,OP_Operation,OP_CreatedDateTime,OP_ModifiedDateTime,OP_ModifiedBy FROM OP_Remesas\
        INNER JOIN OP_Socios ON OP_Remesas.OP_Socio  = OP_Socios.SOC_Id\
        INNER JOIN CLI_Data ON OP_Remesas.OP_Cliente = CLI_Data.CLI_Id\
        INNER JOIN OP_Tasa ON OP_Remesas.OP_Tasa_id = OP_Tasa.TAS_Id\
        INNER JOIN SYS_Status ON OP_Remesas.OP_Status_Id = SYS_Status.STA_Id\
        WHERE OP_Remesas.OP_Date BETWEEN CONCAT(CURRENT_DATE(), " 00:00:00") AND CONCAT(CURRENT_DATE(), " 23:59:59")\
        AND OP_Remesas.OP_Active = 1\
        ORDER BY OP_Remesas.OP_Id DESC'
        console.log(Querys)
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
            message: 'Algo va mal en Banco.controller'
        })
    }

}

export const getStatus = async (req, res) => {
    try {
        const Querys =
            'SELECT * FROM SYS_Status\
            WHERE STA_Active = 1'

        // const Querys = 'SELECT * FROM CLI_Bank WHERE BAN_Active = 1'
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
            message: 'Algo va mal en Banco.controller'
        })
    }

}



export const postCambio = async (req, res) => {
    try {

        const { OP_Date, OP_Socio, OP_Cliente, OP_Pesos, OP_Tasa_id, OP_USTDBuy, OP_USTDSell, OP_Status_Id,
            OP_Operation, OP_CreatedDateTime, OP_ModifiedDateTime, OP_ModifiedBy, OP_Active } = req.body

        //console.log(req.body)

        const Querys = 'INSERT INTO OP_Remesas(OP_Date,OP_Socio,OP_Cliente,OP_Pesos,OP_Tasa_id,OP_USTDBuy,OP_USTDSell,\
            OP_Status_Id,OP_Operation,OP_CreatedDateTime,OP_ModifiedDateTime,OP_ModifiedBy,OP_Active)\
             VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)'

        const Date1 = moment(OP_Date).format("YYYY-MM-DD HH:mm:ss");
        const Date2 = moment(OP_CreatedDateTime).format("YYYY-MM-DD HH:mm:ss");
        const Values = [Date1, req.body.OP_Socio, req.body.OP_Cliente, req.body.OP_Pesos, req.body.OP_Tasa_id,
            req.body.OP_USTDBuy, req.body.OP_USTDSell, req.body.OP_Status_Id, req.body.OP_Operation,
            Date2, Date2, req.body.OP_ModifiedBy, req.body.OP_Active]

        console.log(Values)
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
            message: 'Algo va mal en Cambio.controller'
        })
    }

}
export const putCambio = async (req, res) => {
    try {

        const { OP_Id, OP_Date, OP_Socio, OP_Cliente, OP_Pesos, OP_Tasa_id, OP_USTDBuy, OP_USTDSell, OP_Status_Id, OP_Operation,
             OP_ModifiedDateTime, OP_ModifiedBy, OP_Active } = req.body

        const Querys = 'UPDATE OP_Remesas SET OP_Socio = ?,OP_Cliente = ?,OP_Pesos = ?,OP_Tasa_id = ?\
        ,OP_USTDBuy = ?,OP_USTDSell = ?,OP_Status_Id = ?,OP_Operation = ?,OP_ModifiedDateTime = ?,\
        OP_ModifiedBy = ?,OP_Active = ? WHERE OP_Id = ?'
        //const Date1 = moment(OP_Date).format("YYYY-MM-DD HH:mm:ss");
        const Date2 = moment(OP_CreatedDateTime).format("YYYY-MM-DD HH:mm:ss");
        const Values = [req.body.OP_Socio, req.body.OP_Cliente, req.body.OP_Pesos, req.body.OP_Tasa_id,
        req.body.OP_USTDBuy, req.body.OP_USTDSell, req.body.OP_Status_Id, req.body.OP_Operation,
            Date2, req.body.OP_ModifiedBy, req.body.OP_Active]

        console.log(Values)
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
            message: 'Algo va mal en Cambio.controller'
        })
    }

}