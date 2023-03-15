import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getTasa = async (req, res) => {
  try {
    const Querys =
      "SELECT * FROM OP_Tasa\
                        WHERE OP_Tasa.TAS_Active = 1\
                        ORDER BY TAS_Id desc";

    const [rows] = await pool.query(Querys);

    if (rows.length <= 0) {
      return res.status(201).json([
        {
          TAS_Id: -9999,
        },
      ]);
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en tasa.controller",
    });
  }
};

export const postTasaCliente = async (req, res) => {
  try {
    const {Fecha} = req.body
    // console.log(Fecha)    
    const Date1 = moment(req.body.Fecha).format("YYYY-MM-DD HH:mm:ss"); 
    // console.log(Date1)
    const Querys =
      'SELECT TAS_Id,concat(DATE_FORMAT(TAS_Date, "%d/%m/%y"), " -> ", TAS_TasaCliente) AS TAS_TasaCli,\
        TAS_TasaCLiente, TAS_TasaMayorista FROM OP_Tasa WHERE TAS_Active = 1 AND \
        TAS_Date = ? ORDER BY TAS_Id DESC';
    const Values = [Date1]
    // console.log(Values)
    const [rows] = await pool.query(Querys,Values);

    if (rows.length <= 0) {
      return res.json([
        {
          TAS_Id: -9999,
          TAS_TasaCli: "0",
          TAS_TasaCLiente: "0",
          TAS_TasaMayorista: "0",
        },
      ]);
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en tasa.controller",
    });
  }
};

export const getTasaMayorista = async (req, res) => {
  try {
    const Querys =
      'SELECT TAS_Id,concat(DATE_FORMAT(TAS_Date, "%d/%m/%y"), " -> ", TAS_TasaMayorista) AS TAS_TasaMayo,TAS_TasaCLiente,\
         TAS_TasaMayorista FROM OP_Tasa WHERE TAS_Active = 1 ORDER BY TAS_Id DESC';

    const [rows] = await pool.query(Querys);

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "no hay registros previos",
      });
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en tasa.controller",
    });
  }
};

export const postTasa = async (req, res) => {
  try {
    const {
      TAS_Socio,
      TAS_Date,
      TAS_Binance,
      TAS_DolarPais,
      TAS_Comision,
      TAS_TasaFull,
      TAS_TasaMayorista,
      TAS_TasaCliente,
      TAS_ModifiedBy,
      TAS_Active,
    } = req.body;

    const Date1 = moment(req.body.TAS_Date).format("YYYY-MM-DD 00:00:00");
    const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const Querys =
      "INSERT INTO OP_Tasa (TAS_Date,TAS_Socio,TAS_Binance,TAS_DolarPais,TAS_Comision,TAS_TasaFull,TAS_TasaMayorista,\
                        TAS_TasaCliente,TAS_CreatedDateTime,TAS_ModifiedDateTime,TAS_ModifiedBy,TAS_Active)\
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    const Values = [
      Date1,
      req.body.TAS_Socio,
      req.body.TAS_Binance,
      req.body.TAS_DolarPais,
      req.body.TAS_Comision,
      req.body.TAS_TasaFull,
      req.body.TAS_TasaMayorista,
      req.body.TAS_TasaCliente,
      Date2,
      Date2,
      req.body.TAS_ModifiedBy,
      req.body.TAS_Active,
    ];

    const [rows] = await pool.query(Querys, Values);
    res.send({
      message: "Registro con exito",
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message + " Algo va mal en tasa.controller",
    });
  }
};

export const putTasa = async (req, res) => {
  try {
    const {
      TAS_Id,
      TAS_Date,
      TAS_Socio,
      TAS_Binance,
      TAS_DolarPais,
      TAS_Comision,
      TAS_TasaFull,
      TAS_TasaMayorista,
      TAS_TasaCliente,
      TAS_ModifiedBy,
    } = req.body;

    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const [rows] = await pool.query(
      "UPDATE OP_Tasa SET TAS_Socio = ?, TAS_Binance = ?, TAS_DolarPais = ?, TAS_Comision = ?, TAS_TasaFull = ?, TAS_TasaMayorista = ?, TAS_TasaCliente = ?, TAS_ModifiedDateTime = ?, TAS_ModifiedBy = ? WHERE TAS_Id = ?",
      [
        req.body.TAS_Socio,
        req.body.TAS_Binance,
        req.body.TAS_DolarPais,
        req.body.TAS_Comision,
        req.body.TAS_TasaFull,
        req.body.TAS_TasaMayorista,
        req.body.TAS_TasaCliente,
        Date1,
        req.body.TAS_ModifiedBy,
        req.body.TAS_Id,
      ]
    );
    res.send({
      message: "Actualizado con exito",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en tasa.Controller",
    });
  }
};

export const deleteTasa = async (req, res) => {
  try {
    const { TAS_Id, TAS_ModifiedBy } = req.body;

    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [rows] = await pool.query(
      "UPDATE OP_Tasa SET TAS_ModifiedDateTime = ?, TAS_ModifiedBy = ?, TAS_Active = ? WHERE TAS_Id = ?",
      [Date1, req.body.TAS_ModifiedBy, 0, req.body.TAS_Id]
    );
    res.send({
      message: "Borrado con exito",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en tasa.Controller",
    });
  }
};
