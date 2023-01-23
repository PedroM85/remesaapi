import { query } from "express";
import { pool } from "../db/db.js";

export const getCliente = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM Cli_Data WHERE CLI_Active = 1')

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en cliente.controller'
        })
    }

}

export const getClienteId = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM Cli_Data WHERE CLI_Active = 1 AND CLI_Id')

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en cliente.controller'
        })
    }

}

export const postCliente = async (req, res) => {
    try {
        const Query = 'INSERT INTO OP_Socio (SOC_Name,SOC_Telefono,SOC_CreatedDateTime,SOC_ModifiedDateTime,SOC_ModifiedBy,SOC_Active) VALUES (?,?,?,?,?,?)'
        const Values =  [req.body.SOC_Name,req.body.SOC_Telefono,new Date(),new Date(),req.body.SOC_ModifiedBy,1]
        const [rows] = await pool.query(Query,Values)
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en Cliente.controller'
        })
    }

}

export const putCliente = async (req, res) => {
    try {
        console.log(req.body)
        const Query = 'UPDATE OP_Socio SET SOC_Name = ? ,SOC_Telefono = ?,SOC_ModifiedDateTime = ?,SOC_ModifiedBy = ?, SOC_Active = ? WHERE SOC_Id = ?'
        const Values =  [req.body.SOC_Name,req.body.SOC_Telefono,new Date(),req.body.SOC_ModifiedBy,req.body.SOC_Active, req.body.SOC_Id]
        const [rows] = await pool.query(Query,Values)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en Cliente.controller'
        })
    }

}

export const delCliente = async (req, res) => {
    try {
        const Query = 'UPDATE OP_Socio SET SOC_ModifiedDateTime = ?,SOC_ModifiedBy = ?, SOC_Active = ? WHERE SOC_Id = ?'
        const Values =  [new Date(),req.body.SOC_ModifiedBy,req.body.SOC_Active,req.body.SOC_Id]
        const [rows] = await pool.query(Query, Values)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en Cliente.controller'
        })
    }

}
