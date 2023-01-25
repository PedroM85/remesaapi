import { query } from "express";
import { pool } from "../db/db.js";

export const getCambios = async (req, res) => {
    try {
        const Querys = 
        'SELECT OP_Id, OP_Date,OP_Socio,OP_Socios.SOC_Name,OP_Cliente, CLI_Data.CLI_Nombre,OP_Pesos,OP_Tasa_id,\
        OP_Tasa.TAS_TasaCliente,OP_USTDBuy,OP_USTDSell,OP_Status_Id,SYS_Status.STA_Name,OP_Operation\
        FROM Op_Remesas\
        INNER JOIN OP_Socios ON Op_Remesas.OP_Socio  = OP_Socios.SOC_Id\
        INNER JOIN CLI_Data ON Op_Remesas.OP_Cliente = CLI_Data.CLI_Id\
        INNER JOIN OP_Tasa ON Op_Remesas.OP_Tasa_id = OP_Tasa.TAS_Id\
        INNER JOIN SYS_Status ON Op_Remesas.OP_Status_Id = SYS_Status.STA_Id\
        WHERE Op_Remesas.OP_Active = 1\
        ORDER BY Op_Remesas.OP_Id DESC'

        // const Querys = 'SELECT * FROM CLI_Bank WHERE BAN_Active = 1'
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
            message: 'Algo va mal en Banco.controller'
        })
    }

}