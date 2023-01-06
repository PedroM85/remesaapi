import { pool } from "../db/db.js";

export const ping = async(req, res) => {
    const [result] = await pool.query('Select 1 + 1 as result')
    res.json(result)
}