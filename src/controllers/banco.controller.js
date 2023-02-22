import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getBancos = async (req, res) => {
  try {
    const Querys =
      "SELECT BAN_Id,BAN_Name,BAN_ACC_Id,BAN_ACC_Name,BAN_Prefix,BAN_ModifiedBy,BAN_Active,BAN_CreatedDateTime, \
        BAN_ModifiedDateTime FROM CLI_Bank INNER JOIN CLI_BanAccount ON CLI_Bank.BAN_Type = CLI_BanAccount.BAN_ACC_Id \
        WHERE BAN_Active = 1";

    // const Querys = 'SELECT * FROM CLI_Bank WHERE BAN_Active = 1'
    const [rows] = await pool.query(Querys);
    console.log(rows);
    if (rows.length <= 0) {
      return res.status(201).json([
        {
          BAN_Id: -1,
        },
      ]);
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
    //console.log(error.message)
  }
};

export const getBancoId = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM CLI_Bank WHERE BAN_Active = 1 AND BAN_Id = ?"
    );

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "no hay registros previos",
      });
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Algo va mal en cliente.controller",
    });
  }
};

export const postBanco = async (req, res) => {
  try {
    const { BAN_Name, BAN_Prefix, BAN_Type, BAN_ModifiedBy } = req.body;
    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    //console.log(req.body)
    const Query =
      "INSERT INTO CLI_Bank (BAN_Name,BAN_Type,BAN_Prefix,BAN_CreatedDateTime,BAN_ModifiedDateTime, \
                        BAN_ModifiedBy,BAN_Active) VALUES (?,?,?,?,?,?,?)";
    const Values = [
      req.body.BAN_Name,
      req.body.BAN_Type,
      req.body.BAN_Prefix,
      Date1,
      Date1,
      req.body.BAN_ModifiedBy,
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
      message: "Algo va mal en Banco.controller",
    });
  }
};

export const putBanco = async (req, res) => {
  try {
    const {
      BAN_Name,
      BAN_Prefix,
      BAN_Type,
      BAN_ModifiedBy,
      BAN_Active,
      BAN_Id,
    } = req.body;
    ////console.log(req.body)
    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const Query =
      "UPDATE CLI_Bank SET BAN_Name = ? ,BAN_Prefix = ?,BAN_Type = ?, BAN_ModifiedDateTime = ?, \
                        BAN_ModifiedBy = ?, BAN_Active = ? WHERE BAN_Id = ?";
    const Values = [
      req.body.BAN_Name,
      req.body.BAN_Prefix,
      req.body.BAN_Type,
      Date1,
      req.body.BAN_ModifiedBy,
      req.body.BAN_Active,
      req.body.BAN_Id,
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
      message: "Algo va mal en Banco.controller",
    });
  }
};

export const delBanco = async (req, res) => {
  try {
    const Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const Query =
      "UPDATE CLI_Bank SET BAN_ModifiedDateTime = ?,BAN_ModifiedBy = ?, BAN_Active = ? WHERE BAN_Id = ?";
    const Values = [
      Date1,
      req.body.BAN_ModifiedBy,
      req.body.BAN_Active,
      req.body.BAN_Id,
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
      message: "Algo va mal en Banco.controller",
    });
  }
};

export const getAccountType = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM CLI_BanAccount WHERE BAN_ACC_Active = 1"
    );

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

export const getAccount = async (req, res) => {
  try {
    const Querys =
      'SELECT BAN_Id, Concat(BAN_Name," ",BAN_ACC_Name)AS BAN_Name ,BAN_Prefix,BAN_ModifiedBy,BAN_Active, \
        BAN_CreatedDateTime,BAN_ModifiedDateTime FROM CLI_Bank \
        INNER JOIN CLI_BanAccount ON CLI_Bank.BAN_Type = CLI_BanAccount.BAN_ACC_Id \
        WHERE BAN_Active = 1';

    // const Querys = 'SELECT BAN_Id,BAN_Name,BAN_ACC_Name FROM CLI_Bank INNER JOIN CLI_BanAccount ON CLI_Bank.BAN_Type = CLI_BanAccount.BAN_ACC_Id WHERE BAN_Active = 1'

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
      message: "Algo va mal en Banco.controller",
    });
  }
};
