import { pool } from "../db/db.js";
import { KEYJWT } from "../config.js"
import jwt from "jsonwebtoken";


export const getLogin = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM sys_users WHERE USR_Id = ? AND USR_Password = ?', [req.body.USR_Id, req.body.USR_Password])

        if (rows.length <= 0) {
            return res.status(401).json({
                message: 'Usuario o contraseña no validos'
            })
        } else {
            const payload = {
                check: true
            };
            const token = jwt.sign(payload, KEYJWT, {
                expiresIn: '1h'
            });
            res.json({
                USR_Id: rows[0].USR_Id,
                USR_Name: rows[0].USR_Name,
                message: 'Autenticacion exitosa',
                token: token
            });
            console.log(token)

        }
    } catch (error) {
        return res.status(401).json({
            message: 'Something gows wrong'
        })
    }
}

export const getInfo = async (req, res) => {
    return res.status(201).json({
        message: 'AAA'
    })
}

export const postRegisterLogin = async (req, res) => {
    try {
        const { ULO_Id, ULO_TRM, ULO_Name, ULO_Ip } = req.body

        const [rows] = await pool.query('INSERT INTO SYS_UserLoggedOn (ULO_Id,ULO_TRM,ULO_Name,ULO_Ip,ULO_CreatedDateTime) VALUES (?,?,?,?,?)', [ULO_Id, ULO_TRM, ULO_Name, ULO_Ip, new Date()])
        res.send({
            message: 'Autenticacion exitosa'
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Something gows wrong'
        })
    }
    // console.log(error)
}

export const postRegisterLogout = async (req, res) => {
    try {
        const { ULO_Id } = req.body
        // console.log(req.body)

        const [rows] = await pool.query('DELETE FROM SYS_UserLoggedOn WHERE ULO_Id = (?)', [ULO_Id])
        res.send({
            message: 'Logout exitosa'
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Something goes wrong'
        })
    }
    // console.log(error)
}