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
                message: 'Autenticacion exitosa',
                token: token
            });            
            console.log(token)

        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something gows wrong'
        })
    }
}

export const getInfo = async (req, res) => {
    return res.status(201).json({
        message: 'AAA'
    })
}