import { json, Router } from "express";
import { pool } from "../db/db.js";

const IsSalesDateOpened = Router();

IsSalesDateOpened.use(async (req, res, next) => {
    try {
        const Querys = 'call IsSalesDateOpened(@Opened); select @Opened as Opened;'

        const [result] = await pool.query(Querys)

        console.log(result)
        if (!result ) {
            res.status(401).send ({
                error: "Vacio"
            })
            return
        } 
        else {
            console.log(res);
            return req.status(201).json(
                next()
            )
        }
    } catch (error) {
        return error
    }

})
export default IsSalesDateOpened