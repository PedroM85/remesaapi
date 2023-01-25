import { query } from "express";
import { pool } from "../db/db.js";

export const getBancos = async (req, res) => {
    try {
        const Querys = 'SELECT BAN_Id,BAN_Name,BAN_ACC_Name,BAN_Prefix,BAN_ModifiedBy,BAN_Active,BAN_CreatedDateTime, \
        BAN_ModifiedDateTime FROM CLI_Bank INNER JOIN CLI_BanAccount ON CLI_Bank.BAN_Type = CLI_BanAccount.BAN_ACC_Id \
        WHERE BAN_Active = 1'

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

export const getBancoId = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM CLI_Bank WHERE BAN_Active = 1 AND BAN_Id = ?')

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

export const postBanco = async (req, res) => {
    try {
        const { BAN_Name, BAN_Prefix, BAN_Type, BAN_ModifiedBy } = req.body
        console.log(req.body)
        const Query = 'INSERT INTO CLI_Bank (BAN_Name,BAN_Type,BAN_Prefix,BAN_CreatedDateTime,BAN_ModifiedDateTime, \
                        BAN_ModifiedBy,BAN_Active) VALUES (?,?,?,?,?,?,?)'
        const Values = [req.body.BAN_Name, req.body.BAN_Type, req.body.BAN_Prefix, new Date(), new Date(), req.body.BAN_ModifiedBy, 1]
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
            message: 'Algo va mal en Banco.controller'
        })
    }

}

export const putBanco = async (req, res) => {
    try {
        const { BAN_Name, BAN_Prefix, BAN_Type, BAN_ModifiedBy, BAN_Active, BAN_Id } = req.body
        console.log(req.body)

        const Query = 'UPDATE CLI_Bank SET BAN_Name = ? ,BAN_Prefix = ?,BAN_Type = ?, BAN_ModifiedDateTime = ?, \
                        BAN_ModifiedBy = ?, BAN_Active = ? WHERE BAN_Id = ?'
        const Values = [req.body.BAN_Name, req.body.BAN_Prefix, req.body.BAN_Type, new Date(), req.body.BAN_ModifiedBy, req.body.BAN_Active, req.body.BAN_Id]
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
            message: 'Algo va mal en Banco.controller'
        })
    }

}

export const delBanco = async (req, res) => {
    try {
        const Query = 'UPDATE CLI_Bank SET BAN_ModifiedDateTime = ?,BAN_ModifiedBy = ?, BAN_Active = ? WHERE BAN_Id = ?'
        const Values = [new Date(), req.body.BAN_ModifiedBy, req.body.BAN_Active, req.body.BAN_Id]
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
            message: 'Algo va mal en Banco.controller'
        })
    }

}

export const getAccountType = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM CLI_BanAccount WHERE BAN_ACC_Active = 1')

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


export const getAccount = async (req, res) => {
    try {
        const Querys = 'SELECT BAN_Id, Concat(BAN_Name," ",BAN_ACC_Name)AS BAN_Name ,BAN_Prefix,BAN_ModifiedBy,BAN_Active, \
        BAN_CreatedDateTime,BAN_ModifiedDateTime FROM CLI_Bank \
        INNER JOIN CLI_BanAccount ON CLI_Bank.BAN_Type = CLI_BanAccount.BAN_ACC_Id \
        WHERE BAN_Active = 1'

        // const Querys = 'SELECT BAN_Id,BAN_Name,BAN_ACC_Name FROM CLI_Bank INNER JOIN CLI_BanAccount ON CLI_Bank.BAN_Type = CLI_BanAccount.BAN_ACC_Id WHERE BAN_Active = 1'

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