import { pool } from "../db/db.js";
import moment from "moment-timezone";

export const PostSessionInfo = async (req, res) => {
  try {
    const { SDT_DateClosed } = req.body;

    const Querys =
      "SELECT SSS_DateCreated,SSS_DateClosed FROM STD_Session\
        WHERE SSS_Id = ?";

    const Values = [req.body.SDT_DateClosed];

    const [rows] = await pool.query(Querys, Values);
    //console.log(rows)
    if (rows.length <= 0) {
      return res.status(201).json({
        message: "No hay dia aperturado",
      });
    } else {
      res.json({
        message: "Autenticacion exitosa",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message + "Algo va mal en openning",
    });
  }
};

export const PostOpenSalesDate = async (req, res) => {
  try {
    const { SDT_ModifiedBy, SDT_Fecha } = req.body;

    const Date1 = moment(SDT_Fecha).format("YYYY-MM-DD HH:mm:ss");
    const Querys = "call postOpenSalesDate(?,?)";
    // console.log(Querys)
    const Values = [req.body.SDT_ModifiedBy, Date1];

    const [rows] = await pool.query(Querys, Values);

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "No hay dia aperturado",
      });
    } else {
      res.json({
        message: "Autenticacion exitosa",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.sqlMessage,
    });
  }
};

export const PostCloseSalesDate = async (req, res) => {
  try {
    const { SDT_ModifiedBy, SDT_Fecha } = req.body;
    const Date1 = moment(SDT_Fecha).format("YYYY-MM-DD 00:00:00");
    const Querys = "call postCloseSalesDate(?,?)";
    // console.log(Querys)
    const Values = [req.body.SDT_ModifiedBy, Date1];

    const [rows] = await pool.query(Querys, Values);
    // console.log(rows);
    if (rows.length <= 0) {
      return res.status(201).json({
        message: "Dia de venta cerrado",
      });
    } else {
      res.json([
        {
          Code: 1,
        },
      ]);
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message      
    });
  }
};

export const PostReOpenSession = async (req, res) => {
  try {
    const { nSessionId } = req.body;

    const Querys = "call postReOpenSession(?)";
    // console.log(Querys)
    const Values = [req.body.SDT_ModifiedBy];

    const [rows] = await pool.query(Querys, Values);

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "No hay dia aperturado",
      });
    } else {
      res.json({
        message: "Autenticacion exitosa",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.sqlMessage,
    });
  }
};

export const PostPaymentTypePerSession = async (req, res) => {
  try {
    const { SSS_Id } = req.body;
    // console.log(req.body.SSS_Id);

    const Querys =
    "SELECT OSB_Id,OSB_Nombre, IFNULL(SSP_SalesBuy,0)AS SSP_SalesBuy,IFNULL(SSP_SalesAmount,0) AS SSP_SalesAmount,\
    IFNULL(SSP_Profit,0) AS SSP_Profit FROM STD_SessionPaymentType\
    RIGHT JOIN OP_Socios_Bank ON SSP_OSB_Id = OSB_Id\
    AND SSP_SSS_Id = ? WHERE OSB_Active = 1" 
    // console.log(Querys);
    const Values = [req.body.SSS_Id];
    const [rows] = await pool.query(Querys, Values);
    // console.log(rows);
    if (rows.length <= 0) {
      return res.status(201).json({
        message: "No hay dia aperturado",
      });
    } else {
      res.json(rows);
    }
  } catch (error) {
    return res.status(400).json({
      message: error.sqlMessage,
    });
  }
};

export const PostCounter = async (req, res) => {
  try {
    const { Fecha } = req.body;

    const Date1 = moment(Fecha).format("YYYY-MM-DD HH:mm:ss");
    const Querys = "call STD_Counter(?)";
    const Values = [Date1];
    const [rows] = await pool.query(Querys, Values);

    if (rows.length <= 0) {
      return res.status(201).json({
        message: "No hay dia aperturado",
      });
    } else {
      res.json({
        message: "Autenticacion exitosa",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.sqlMessage,
    });
  }
};
