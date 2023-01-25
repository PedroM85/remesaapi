import { query } from "express";
import { pool } from "../db/db.js";

export const getCliente = async (req, res) => {
    try {
        const Querys = 'SELECT CLI_Id, CLI_Nombre,CLI_Banco,  concat(BAN_Name, " ",BAN_ACC_Name) AS BAN_Name, CLI_Cuenta,CLI_Titular, \
        CLI_Cedula,CLI_CreatedDateTime, CLI_ModifiedDateTime, CLI_ModifiedBy, CLI_Active FROM CLI_Data \
        INNER JOIN CLI_Bank ON CLI_Data.CLI_Banco = CLI_Bank.BAN_Id \
        INNER JOIN CLI_BanAccount ON CLI_Bank.BAN_Type= CLI_BanAccount.BAN_ACC_Id \
        WHERE CLI_Active = 1'
        // const [rows] = await pool.query('SELECT * FROM CLI_Data WHERE CLI_Active = 1')
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
            message: 'Algo va mal en cliente.controller'
        })
    }

}

export const getClienteId = async (req, res) => {
    try {
        const { CLI_Id } = req.body
        const Querys = ('SELECT * FROM CLI_Data WHERE CLI_Active = 1 AND CLI_Id = ?')
        const Values = [req.body.CLI_Id]
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
            message: 'Algo va mal en cliente.controller'
        })
    }

}

export const postCliente = async (req, res) => {
    try {

        const { CLI_Nombre, CLI_Banco, CLI_Cuenta, CLI_Titular, CLI_Cedula, CLI_ModifiedBy, CLI_Active } = req.body
        console.log(req.body)
        const Query = 'INSERT INTO CLI_Data (CLI_Nombre,CLI_Banco,CLI_Cuenta,CLI_Titular,CLI_Cedula,CLI_CreatedDateTime, \
            CLI_ModifiedDateTime,CLI_ModifiedBy,CLI_Active) VALUES (?,?,?,?,?,?,?,?,?)'
        const Values = [req.body.CLI_Nombre, req.body.CLI_Banco, req.body.CLI_Cuenta, req.body.CLI_Titular, req.body.CLI_Cedula,
        new Date(), new Date(), req.body.CLI_ModifiedBy, req.body.CLI_Active]
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

export const putCliente = async (req, res) => {
    try {
        console.log(req.body)
        const { CLI_Name, CLI_Banco, CLI_Cuenta, CLI_Titular, CLI_Cedula, CLI_ModifiedBy, CLI_Active, CLI_Id } = req.body
        const Query = 'UPDATE CLI_Data SET CLI_Nombre = ? ,CLI_Banco = ?, CLI_Cuenta = ?, CLI_Titular = ?, CLI_Cedula = ?, \
                    CLI_ModifiedDateTime = ?,CLI_ModifiedBy = ?, CLI_Active = ? WHERE CLI_Id = ?'
        const Values = [req.body.CLI_Nombre, req.body.CLI_Banco, req.body.CLI_Cuenta, req.body.CLI_Titular, req.body.CLI_Cedula,
        new Date(), req.body.CLI_ModifiedBy, req.body.CLI_Active, req.body.CLI_Id]
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

export const delCliente = async (req, res) => {
    try {
        const { CLI_ModifiedBy, CLI_Active, CLI_Id } = req.body
        const Query = 'UPDATE CLI_Data SET CLI_ModifiedDateTime = ?,CLI_ModifiedBy = ?, CLI_Active = ? WHERE CLI_Id = ?'
        const Values = [new Date(), req.body.CLI_ModifiedBy, req.body.CLI_Active, req.body.CLI_Id]
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
