import { pool } from "../db/db.js";


export const getOpenning = async (req, res) => {
    try {
        
        
        const [rows] = await pool.query('SELECT * FROM STD_SalesDate WHERE SDT_DateClosed = ? AND SDT_SIT_Id =?', [req.body.SDT_DateClosed, req.body.SDT_SIT_Id])
        // console.log(rows)
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'No hay dia aperturado'
            })
        } else {
            res.json({                
                message: 'Autenticacion exitosa'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Something goes wrong'
        })
    }
    
}