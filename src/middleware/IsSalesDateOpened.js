import { Router } from "express";
import { pool } from "../db/db.js";
import moment from "moment-timezone";

const IsSalesDateOpened = Router();

IsSalesDateOpened.use(async(req, res, next) => {
    try {
        const Date1 = moment(new Date()).format("YYYY-MM-DD");

        const Querys = 'SELECT SDT_DateClosed FROM STD_SalesDate WHERE SDT_Id = ?'
        const Values = [Date1]
        const result = await pool.query(Querys, Values)
        // console.log(result)
        const SDT_DateClosed = result[0][0].SDT_DateClosed
        console.log(SDT_DateClosed)

        if (SDT_DateClosed === null) {
            next()
        } else {
            return res.status(201).json({
                message: 'No hay dia de cambio aperturado'
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            message : result,
            error: 'openning.Controller PostCloseSession'
        })
    }


})

export default IsSalesDateOpened