import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const getBancosSO = async (req, res) => {
  try {
    const Querys =
      "SELECT OSB_Id,OSB_Nombre,OSB_Type,OSBT_Nombre,OSB_Account,OSB_InitialBalance,\
        OSB_BeginninBalanceDate,OSB_Description,OSB_CreatedDateTime,OSB_ModifiedDateTime,OSB_ModifiedBy,\
        OSB_Active FROM OP_Socios_Bank\
        INNER JOIN OP_Socios_Bank_Type ON OP_Socios_Bank.OSB_Type = OP_Socios_Bank_Type.OSBT_Id\
        WHERE OSB_Active = 1";

    const [rows] = await pool.query(Querys);

    if (rows.length <= 0) {
      return res.status(201).json([
        {
          OSB_Id: -1,
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

export const getBancosType = async (req, res) => {
  try {
    const Querys =
      "SELECT * FROM OP_Socios_Bank_Type\
        WHERE OSBT_Active = 1";

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
      message: error.message + "Algo va mal en BancoSo.controller",
    });
  }
};

export const postBancosSO = async (req, res) => {
  try {
    const {
      OSB_Nombre,
      OSB_Type,
      OSB_Account,
      OSB_InitialBalance,
      OSB_BeginninBalanceDate,
      OSB_Description,
      OSB_CreatedDateTime,
      OSB_ModifiedDateTime,
      OSB_ModifiedBy,
      OSB_Active,
    } = req.body;

    const Date1 = moment(OSB_BeginninBalanceDate).format("YYYY-MM-DD HH:mm:ss");
    const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const Querys =
      "INSERT INTO OP_Socios_Bank(OSB_Nombre,OSB_Type,OSB_Account,OSB_InitialBalance,\
        OSB_BeginninBalanceDate,OSB_Description,OSB_CreatedDateTime,OSB_ModifiedDateTime,OSB_ModifiedBy,OSB_Active)\
        VALUES (?,?,?,?,?,?,?,?,?,?)";

    const Values = [
      req.body.OSB_Nombre,
      req.body.OSB_Type,
      req.body.OSB_Account,
      req.body.OSB_InitialBalance,
      Date1,
      req.body.OSB_Description,
      Date2,
      Date2,
      req.body.OSB_ModifiedBy,
      req.body.OSB_Active,
    ];

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
      message: error.message + "Algo va mal en BancoSo.controller",
    });
  }
};

export const putBancosSO = async (req, res) => {
  try {
    const {
      OSB_Id,
      OSB_Nombre,
      OSB_Type,
      OSB_Account,
      OSB_InitialBalance,
      OSB_BeginninBalanceDate,
      OSB_Description,
      OSB_CreatedDateTime,
      OSB_ModifiedDateTime,
      OSB_ModifiedBy,
      OSB_Active,
    } = req.body;

    const Date1 = moment(OSB_BeginninBalanceDate).format("YYYY-MM-DD HH:mm:ss");
    const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const Querys =
      "UPDATE OP_Socios_Bank SET OSB_Nombre = ?, OSB_Type = ?, OSB_Account = ?, OSB_InitialBalance = ?,\
        OSB_BeginninBalanceDate = ?,OSB_Description = ?,OSB_ModifiedDateTime = ?,OSB_ModifiedBy = ?,\
        OSB_Active = ? WHERE OSB_Id = ?";
    const Values = [
      req.body.OSB_Nombre,
      req.body.OSB_Type,
      req.body.OSB_Account,
      req.body.OSB_InitialBalance,
      Date1,
      req.body.OSB_Description,
      Date2,
      req.body.OSB_ModifiedBy,
      req.body.OSB_Active,
      req.body.OSB_Id,
    ];

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
      message: error.message + "Algo va mal en BancoSo.controller",
    });
  }
};

export const delBancosSO = async (req, res) => {
  try {
    const { OSB_Id, OSB_ModifiedDateTime, OSB_ModifiedBy, OSB_Active } =
      req.body;

    const Date2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const Querys =
      "UPDATE OP_Socios_Bank SET OSB_ModifiedDateTime = ?,OSB_ModifiedBy = ?,\
        OSB_Active = ? WHERE OSB_Id = ?";
    const Values = [
      Date2,
      req.body.OSB_ModifiedBy,
      req.body.OSB_Active,
      req.body.OSB_Id,
    ];

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
      message: error.message + "Algo va mal en BancoSo.controller",
    });
  }
};
