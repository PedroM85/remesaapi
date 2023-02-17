import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const GetSalesDateInfo = async (req, res) => {
    try {

        const Querys = 'SELECT SDT_Id, SDT_DateOpened, (SELECT COUNT(*) FROM SYS_UserLoggedOn)AS UsersLoggedOn,\
        ("dia aperturado") AS Message FROM STD_SalesDate WHERE SDT_DateClosed IS NULL'

        const [rows] = await pool.query(Querys)
        // console.log(rows)
        if (rows.length <= 0) {
            res.json(
                [{ Message: "No hay dia aperturado" }]
            )
        } else {
            res.json(rows);
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

        const Date1 = moment(SDT_DateClosed).format("YYYY-MM-DD");

        const Querys = 'SELECT SSS_Id, SSS_SDT_Id,SSS_TRM_Id,USR_Id,USR_Name,SSS_DateCreated,SSS_DateClosed FROM STD_Session\
        INNER JOIN sys_users ON SSS_USR_Id = USR_Id\
        WHERE SSS_SDT_Id = ?'

        const Values = [Date1]

        const [rows] = await pool.query(Querys, Values)
        // console.log(rows)
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'No hay dia aperturado'
            })
        } else {
            res.json(
                rows
            );
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + 'Algo va mal en openning'
        })
    }

}

export const PostCloseSession = async (req, res) => {
    try {
        const { SDT_ModifiedBy, SSS_Id } = req.body
        const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        const Querys = 'UPDATE STD_Session SET SSS_DateClosed = ?, SSS_ModifiedBy = ?,\
        SSS_ModifiedDateTime = ? WHERE SSS_Id= ?'

        const Values = [Date1, req.body.SDT_ModifiedBy, Date1, req.body.SSS_Id]

        const [rows] = await pool.query(Querys, Values)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'No hay dia aperturado'
            })
        } else {
            res.json(
                rows
            );
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            error: 'openning.Controller PostCloseSession'
        })
    }

}

export const PostSessionInfo = async (req, res) => {
    try {
        const { SSS_Id } = req.body

        const Querys = 'SELECT SSS_DateCreated, SSS_DateClosed FROM STD_Session WHERE SSS_Id = ?'

        const Values = [req.body.SSS_Id]

        const [rows] = await pool.query(Querys, Values)

        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'No hay dia aperturado'
            })
        } else {
            res.json(
                rows
            );
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + 'Algo va mal en openning'
        })
    }

}

export const isopenning = async (req, res) => {
    try {

        const Date1 = moment(new Date()).format("YYYY-MM-DD");

        const Querys = 'SELECT ifnull(SSS_DateClosed,"Session open") AS SSS_DateClosed FROM STD_Session WHERE SSS_SDT_Id = ? '
        const Values = [Date1]
        const result = await pool.query(Querys, Values)
        console.log(result)
        const SSS_DateClosed = result[0][0].SSS_DateClosed

        if (SSS_DateClosed === 'Session open') {
            res.json({
                SSS_DateClosed: null
            })
        } else {
            res.json({
                SSS_DateClosed: moment(SSS_DateClosed).format("YYYY-MM-DD")
            })
        }

    } catch (error) {
        return res.status(401).json({
            message: error.message,
            error: 'openning.Controller PostCloseSession'
        })
    }
}