import { pool } from "../db/db.js";
import { KEYJWT } from "../config.js";
import moment from "moment-timezone";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getLogin = async (req, res) => {
  try {
    const { USR_Id, USR_Password } = req.body;

    const [passdb] = await pool.query(
      "SELECT * from sys_users WHERE USR_Id = ?",
      [req.body.USR_Id]
    );
    // console.log(passdb);

    if (passdb.length === 0) {
      return res.status(201).json({
        message: "Usuario o contraseña no validos",
      });
    } else {
      // console.log(USR_Password);
      // console.log(passdb[0].USR_Password);

      const IsMatch = await bcrypt.compare(
        USR_Password,
        passdb[0].USR_Password
      );
      // console.log(IsMatch);

      if (IsMatch) {
        const payload = {
          check: true,
        };

        const token = jwt.sign(payload, KEYJWT, {
          expiresIn: "6h",
        });
        console.log("Se conecto: " + passdb[0].USR_Name)
        res.json({
          USR_Id: passdb[0].USR_Id,
          USR_Name: passdb[0].USR_Name,
          USR_IpAddress: req.body.USR_IpAddress,
          USR_SessionEnd: moment(new Date())
            .add(6, "hour")
            .format("YYYY-MM-DD HH:mm:ss"),
          message: "Autenticacion exitosa",
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

export const getInfo = async (req, res) => {
  return res.status(201).json({
    message: "AAA",
  });
};

export const postRegisterLogin = async (req, res) => {
  try {
    const { ULO_Id, ULO_TRM, ULO_Name, ULO_Ip } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO SYS_UserLoggedOn (ULO_Id,ULO_TRM,ULO_Name,ULO_Ip,ULO_CreatedDateTime) VALUES (?,?,?,?,?)",
      [ULO_Id, ULO_TRM, ULO_Name, ULO_Ip, moment(new Date()).format("YYYY-MM-DD HH:mm:ss")]
    );
    res.send({
      message: "Autenticacion exitosa",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Something gows wrong",
    });
  }
  // console.log(error)
};

export const postRegisterLogout = async (req, res) => {
  try {
    const { ULO_Id } = req.body;
    // console.log(req.body)

    const [rows] = await pool.query(
      "DELETE FROM SYS_UserLoggedOn WHERE ULO_Id = (?)",
      [ULO_Id]
    );
    res.send({
      message: "Logout exitosa",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Something goes wrong",
    });
  }
  // console.log(error)
};
