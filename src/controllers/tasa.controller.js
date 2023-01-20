import { pool } from "../db/db.js";

export const getTasa = async (req, res) => {
    try {
        
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

export const postTasa = async (req,res) => {
    try {
        const { TAS_Date,TAS_Binance,TAS_DolarPais,TAS_Comision,TAS_TasaFull,TAS_TasaMayorista,TAS_TasaCliente } = req.body        
        console.log(req.body)

        const [rows] = await pool.query('INSERT INTO OP_Tasa (TAS_Date,TAS_Binance,TAS_DolarPais,TAS_Comision,TAS_TasaFull,TAS_TasaMayorista,TAS_TasaCliente) VALUES (?,?,?,?,?,?,?)', [req.body.TAS_Date,req.body.TAS_Binance,req.body.TAS_DolarPais,req.body.TAS_Comision,req.body.TAS_TasaFull,req.body.TAS_TasaMayorista,req.body.TAS_TasaCliente])
        res.send({
            message: 'Registro con exito'
        })
    }catch(error){
        return res.status(401).json({
            message: 'Algo va mal en tasa.controller'
        })
    }
}

export const pathTasa= async (req,res) => {
    try{
        const { TAS_Date,TAS_Binance,TAS_DolarPais,TAS_Comision,TAS_TasaFull,TAS_TasaMayorista,TAS_TasaCliente } = req.body        
        console.log(req.body) 

        
        const [rows] = await pool.query('INSERT INTO OP_Tasa (TAS_Date,TAS_Binance,TAS_DolarPais,TAS_Comision,TAS_TasaFull,TAS_TasaMayorista,TAS_TasaCliente) VALUES (?,?,?,?,?,?,?)', [req.body.TAS_Date,req.body.TAS_Binance,req.body.TAS_DolarPais,req.body.TAS_Comision,req.body.TAS_TasaFull,req.body.TAS_TasaMayorista,req.body.TAS_TasaCliente])
        res.send({
            message: 'Registro con exito'
        })


    }catch(error){
        return res.status(401).json({
            message: 'Algo va mal en tasa.Controller'
        })
    }
}