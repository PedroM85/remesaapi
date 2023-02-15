import { json, Router } from "express";
import { pool } from "../db/db.js";
import moment from "moment-timezone";

const IsSalesDateOpened = Router();

IsSalesDateOpened.get = async (req, res, next) => {
    try {
        const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        
        const Querys = 'call IsSalesDateOpened(?)'
        
        const Values = Date2
        
        const [result] = await pool.query(Querys,Values)
        

        console.log(result)
        if (!result ) {
            result.status(401).send ({
                error: "Vacio"
            })
            return
        } 
        else {
            console.log(result);
            return result.status(201).json(
                
                next()
            )
        }
    } catch (error) {
        return error
    }

}
export default IsSalesDateOpened