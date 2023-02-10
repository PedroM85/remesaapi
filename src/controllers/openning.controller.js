import { pool } from "../db/db.js";


export const getSalesDateInfo = async (req, res) => {
    try {
        
        const Querys = 'SELECT SDT_Id, SDT_DateOpened, (SELECT COUNT(*) FROM SYS_UserLoggedOn)AS UsersLoggedOn\
         FROM STD_SalesDate WHERE SDT_DateClosed IS NULL'

        const [rows] = await pool.query(Querys)
        // console.log(rows)
        if (rows.length <= 0) {
            return res.status(201).json({
                Message: 'No hay dia aperturado'
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

export const PostSessionsPerSalesDate = async (req, res) => {
    try {
        const { SDT_DateClosed } = req.body

        const Querys = 'SELECT * FROM STD_SalesDate WHERE SDT_DateClosed = ? '

        const Values = [req.body.SDT_DateClosed]

        const [rows] = await pool.query(Querys, Values)
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
            message: error.message + 'Algo va mal en openning'
        })
    }

}
