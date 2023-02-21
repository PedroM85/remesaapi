import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getCambiosDiarios = async (req, res) => {
  try {
    const { OP_DateStart, OP_DateEnd } = req.body;
    // console.log(req.body)
    const DateStart = moment(req.body.OP_DateStart).format(
      "YYYY-MM-DD 00:00:00"
    );
    // console.log(DateStart)
    const DateEnd = moment(req.body.OP_DateEnd).format("YYYY-MM-DD 23:59:59");
    // console.log(DateEnd)
    const Querys =
      "SELECT DATE(op_date) AS OP_Fecha, OP_Socio, SUM(op_pesos) AS OP_Pesos from OP_Remesas\
                        WHERE OP_Date BETWEEN ? AND ? GROUP BY OP_Fecha, OP_Socio";
    const Values = [DateStart, DateEnd];
    // console.log(Querys)
    // console.log(Values)
    // const Querys = 'SELECT * FROM CLI_Bank WHERE BAN_Active = 1'
    const [rows] = await pool.query(Querys, Values);

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "no hay registros previos",
      });
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en Banco.controller",
    });
  }
};

export const getTotalMensual = async (req, res) => {
  try {
    const Querys =
      "SELECT SUM(OP_Pesos)AS OP_Pesos , (SELECT COUNT(*) FROM OP_Remesas)AS OP_NumOrden, \
        (SELECT COUNT(*) AS CLI_Cliente FROM CLI_Data) AS CLI_Cliente, (SELECT COUNT(*) AS OP_Cambios \
        FROM OP_Remesas)AS OP_Cambios FROM OP_Remesas WHERE MONTH(OP_Date)= MONTH(CURRENT_DATE()) AND OP_Active = 1";
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
      message: "Algo va mal en Dashboard.controller",
    });
  }
};
