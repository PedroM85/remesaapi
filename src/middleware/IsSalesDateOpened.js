import { Router } from "express";
import { pool } from "../db/db.js";
import moment from "moment-timezone";

const IsSalesDateOpened = Router();

IsSalesDateOpened.use(async (req, res, next) => {
    try {
        const Fecha = req.Fecha       
        console.log(Fecha)
        const Querys = 'SELECT ifnull(SDT_DateClosed,"Session open") AS SDT_DateClosed FROM STD_SalesDate WHERE SDT_Id = ? '
        const Values = [Fecha]
        const result = await pool.query(Querys, Values)
        // console.log(result[0][0].SDT_DateClosed)
        const SDT_DateClosed = result[0][0].SDT_DateClosed

        if (SDT_DateClosed === 'Session open') {
            res.json(
                next()
            )
        } else {
            res.json({
                SDT_DateClosed: moment(SDT_DateClosed).format("YYYY-MM-DD HH:mm:ss")
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message

        })
    }


})

export default IsSalesDateOpened