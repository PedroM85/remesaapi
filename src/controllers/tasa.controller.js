import { pool } from "../db/db.js";

export const getTasa = async (req, res) => {
    try {

        const Querys = 'SELECT * FROM OP_Tasa\
                        WHERE OP_Tasa.TAS_Active = 1\
                        ORDER BY TAS_Id desc'

        const [rows] = await pool.query(Querys)

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

export const getTasaCliente = async (req, res) => {
    try {

        const Querys = 'SELECT TAS_Id,concat(DATE_FORMAT(TAS_Date, "%d/%m/%y"), " -> ", TAS_TasaCliente) AS TAS_TasaCli,\
        TAS_TasaCLiente, TAS_TasaMayorista FROM OP_Tasa WHERE TAS_Active = 1 ORDER BY TAS_Id DESC'

        const [rows] = await pool.query(Querys)

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

export const getTasaMayorista = async (req, res) => {
    try {

        const Querys = 'SELECT TAS_Id,concat(DATE_FORMAT(TAS_Date, "%d/%m/%y"), " -> ", TAS_TasaMayorista) AS TAS_TasaMayo,TAS_TasaCLiente,\
         TAS_TasaMayorista FROM OP_Tasa WHERE TAS_Active = 1 ORDER BY TAS_Id DESC'

        const [rows] = await pool.query(Querys)

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

export const postTasa = async (req, res) => {
    try {
        const { TAS_Date, TAS_Binance, TAS_DolarPais, TAS_Comision, TAS_TasaFull, TAS_TasaMayorista, TAS_TasaCliente,TAS_ModifiedBy } = req.body
        console.log(req.body)

        const [rows] = await pool.query('INSERT INTO OP_Tasa (TAS_Date,TAS_Binance,TAS_DolarPais,TAS_Comision,TAS_TasaFull,TAS_TasaMayorista,TAS_TasaCliente,TAS_CreatedDAteTime,TAS_ModifiedDateTime,TAS_ModifiedBy_TAS_Active) VALUES (?,?,?,?,?,?,?)', [req.body.TAS_Date, req.body.TAS_Binance, req.body.TAS_DolarPais, req.body.TAS_Comision, req.body.TAS_TasaFull, req.body.TAS_TasaMayorista, req.body.TAS_TasaCliente,new Date(),new Date(),req.body.TAS_ModifiedBy,1])
        res.send({
            message: 'Registro con exito'
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en tasa.controller'
        })
    }
}

export const putTasa = async (req, res) => {
    try {        
        const { TAS_Id, TAS_Date, TAS_Binance, TAS_DolarPais, TAS_Comision, TAS_TasaFull, TAS_TasaMayorista, TAS_TasaCliente,TAS_ModifiedBy } = req.body
        console.log(req.body)
        const [rows] = await pool.query('UPDATE OP_Tasa SET  TAS_Date = ?, TAS_Binance = ?, TAS_DolarPais = ?, TAS_Comision = ?, TAS_TasaFull = ?, TAS_TasaMayorista = ?, TAS_TasaCliente = ?, TAS_ModifiedDateTime = ?, TAS_ModifiedBy = ? WHERE TAS_Id = ?', [req.body.TAS_Date, req.body.TAS_Binance, req.body.TAS_DolarPais, req.body.TAS_Comision, req.body.TAS_TasaFull, req.body.TAS_TasaMayorista, req.body.TAS_TasaCliente, req.body.TAS_Id,new Date(),req.body.TAS_ModifiedBy])
        res.send({
            message: 'Actualizado con exito'
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Algo va mal en tasa.Controller'
        })
    }
}

export const deleteTasa= async (req,res) => {
    try{
        const { TAS_Id,TAS_ModifiedBy } = req.body
        console.log(req.body)
        const [rows] = await pool.query('UPDATE OP_Tasa SET TAS_ModifiedDateTime = ?, TAS_ModifiedBy = ?, TAS_Active = ? WHERE TAS_Id = ?', [new Date(),req.body.TAS_ModifiedBy,0,req.body.TAS_Id])
        res.send({
            message: 'Borrado con exito'
        })
    }catch(error){
        return res.status(401).json({
            message: 'Algo va mal en tasa.Controller'
        })
    }
}