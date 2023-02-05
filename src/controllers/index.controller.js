import { pool } from "../db/db.js";


export const ping = async(req, res) => {


    const [result] = await pool.query('SELECT NOW()')
    res.json(result)
}

export const pong = async(req, res) => {


    const [result] = await pool.query('call SYS_SetupConnection()')
    res.json(result)
}