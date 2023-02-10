import { pool } from "../db/db.js";


export const PostSessionInfo = async (req, res) => {
    try {
        const { SDT_DateClosed } = req.body

        const Querys = 'SELECT SSS_DateCreated,SSS_DateClosed FROM STD_Session\
        WHERE SSS_Id = ?'

        const Values = [req.body.SDT_DateClosed]

        const [rows] = await pool.query(Querys, Values)
        //console.log(rows)
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
            message: error.message + 'Algo va mal en openning'
        })
    }

}

export const PostOpenSalesDate = async (req, res) => {
    try {
        const { SDT_ModifiedBy } = req.body

        const Querys = 'call postOpenSalesDate(?)'
        // console.log(Querys)
        const Values = [req.body.SDT_ModifiedBy]

        const [rows] = await pool.query(Querys,Values)
        console.log(rows + "a")
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
        
            return res.status(400).json({
                message: error.sqlMessage
            })

        }
        
    

}

export const PostCloseSalesDate = async (req, res) => {
    try {
        const { SDT_ModifiedBy } = req.body

        const Querys = 'call postCloseSalesDate(?)'
        // console.log(Querys)
        const Values = [req.body.SDT_ModifiedBy]

        const [rows] = await pool.query(Querys,Values)
        // console.log(rows)        
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'Dia de venta cerrado'
            })
        } else {
            res.json({
                message: 'Autenticacion exitosa'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }

}


