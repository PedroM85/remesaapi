import { query } from "express";
import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getSocio = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM OP_Socios WHERE SOC_Active = 1"
    );

    if (rows.length <= 0) {
      return res.status(201).json([
        {
          SOC_Id: -1,
        },
      ]);
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export const postSocio = async (req, res) => {
  try {
    const { SOC_Name, SOC_Telefono, SOC_ModifiedBy } = req.body;

    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const Query =
      "INSERT INTO OP_Socios\
      (SOC_Name,SOC_Telefono,SOC_CreatedDateTime,SOC_ModifiedDateTime,SOC_ModifiedBy,SOC_Active)\
       VALUES (?,?,?,?,?,?)";

    const Values = [
      req.body.SOC_Name,
      req.body.SOC_Telefono,
      Date1,
      Date1,
      req.body.SOC_ModifiedBy,
      1,
    ];
    const [rows] = await pool.query(Query, Values);
    if (rows.length <= 0) {
      return res.status(201).json({
        message: "no hay registros previos",
      });
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export const putSocio = async (req, res) => {
  try {
    const { SOC_Name, SOC_Telefono, SOC_ModifiedBy } = req.body;

    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const Query =
      "UPDATE OP_Socios SET SOC_Name = ? ,SOC_Telefono = ?,SOC_ModifiedDateTime = ?,SOC_ModifiedBy = ?, SOC_Active = ? WHERE SOC_Id = ?";
    const Values = [
      req.body.SOC_Name,
      req.body.SOC_Telefono,
      Date1,
      req.body.SOC_ModifiedBy,
      req.body.SOC_Active,
      req.body.SOC_Id,
    ];
    const [rows] = await pool.query(Query, Values);

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "no hay registros previos",
      });
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en socio.controller",
    });
  }
};

export const DelSocio = async (req, res) => {
  try {
    const { SOC_ModifiedBy, SOC_Active, SOC_Id } = req.body;

    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const Query =
      "UPDATE OP_Socios SET SOC_ModifiedDateTime = ?,SOC_ModifiedBy = ?, SOC_Active = ? WHERE SOC_Id = ?";
    const Values = [
      Date1,
      req.body.SOC_ModifiedBy,
      req.body.SOC_Active,
      req.body.SOC_Id,
    ];
    const [rows] = await pool.query(Query, Values);

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "no hay registros previos",
      });
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en socio.controller",
    });
  }
};
