import { pool } from "../db/db.js";

export const getTasa = async (req, res) => {
    try {
        console.log("tasa.controller linea 5")
        console.log(req.body)
        const [rows] = await pool.query('SELECT * FROM OP_Tasa')
        
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'no hay registros previos'
            })
        } else {
            res.json(rows);
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en tasa.controller'
        })
    }
    
}