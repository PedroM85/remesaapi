import { pool } from "../db/db.js";
import { KEYJWT } from "../config.js"
import moment from "moment-timezone"
import jwt from "jsonwebtoken";
import { json } from "express";



export const getLogin = async (req, res) => {
    try {
        //console.log(req.body.USR_IpAddress)
        const [rows] = await pool.query('SELECT * FROM sys_users WHERE USR_Id = ? AND USR_Password = ?', [req.body.USR_Id, req.body.USR_Password])

        if (rows.length <= 0) {
            return res.status(401).json({
                message: 'Usuario o contraseña no validos'
            })
        } else {
            const payload = {
                check: true
            };
            const token = jwt.sign(payload, KEYJWT, {
                expiresIn: '1h'
            });
            res.json({
                USR_Id: rows[0].USR_Id,
                USR_Name: rows[0].USR_Name,
                USR_IpAddress: req.body.USR_IpAddress,
                USR_SessionEnd: moment(new Date()).add(1, 'hour').format("YYYY-MM-DD HH:mm:ss"),
                message: 'Autenticacion exitosa',
                token: token
            });
            //console.log(token)

        }
    } catch (error) {
        return res.status(401).json({
            message: 'Something gows wrong'
        })
    }
}

export const getInfo = async (req, res) => {
    return res.status(201).json({
        message: 'AAA'
    })
}

export const postRegisterLogin = async (req, res) => {
    try {
        const { ULO_Id, ULO_TRM, ULO_Name, ULO_Ip } = req.body

        const [rows] = await pool.query('INSERT INTO SYS_UserLoggedOn (ULO_Id,ULO_TRM,ULO_Name,ULO_Ip,ULO_CreatedDateTime) VALUES (?,?,?,?,?)', [ULO_Id, ULO_TRM, ULO_Name, ULO_Ip, new Date()])
        res.send({
            message: 'Autenticacion exitosa'
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Something gows wrong'
        })
    }
    // console.log(error)
}

export const postRegisterLogout = async (req, res) => {
    try {
        const { ULO_Id } = req.body
        // console.log(req.body)

        const [rows] = await pool.query('DELETE FROM SYS_UserLoggedOn WHERE ULO_Id = (?)', [ULO_Id])
        res.send({
            message: 'Logout exitosa'
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Something goes wrong'
        })
    }
    // console.log(error)
}

export const isopenning = async (req,res) => {


    try {
        // const employee={
        //     id: 1,
        //     name: 'Raj',
        //     department: 'Sales'
        // }
        // console.log(employee)
        // //object into string
        // const empJsonStr=JSON.stringify(employee)
        // //JSON. stringify() is used to create a JSON string out
        // //of an object or array; it serializes a JavaScript object
        // //into a JSON string.
        // console.log(empJsonStr)
        // console.log(empJsonStr.name)
        // var empObject = JSON.parse(empJsonStr)
        // //JSON. parse() is used for parsing data that was received
        // //as JSON; it deserializes a JSON string into a JavaScript object.
        // console.log(empObject.name)

    const Querys ='SELECT SDT_DateClosed FROM STD_SalesDate WHERE SDT_Id = "2023-02-14 00:00:00"'
    const result =  await pool.query(Querys)
    console.log(result[0])
    console.log([ { SDT_DateClosed: null } ])

    if (result[0] === [ { SDT_DateClosed: null } ]){
        console.log("Null")
    }else {
        console.log("a")
    }
    // const resultStr = JSON.stringify(result[0])
    // console.log(resultStr)
    // const Obj = JSON.parse(result)
    // console.log(Obj)
    // // const obj = JSON.parse(result)

    // console.log(obj.SDT_DateClosed)

    // res.json(obj)

    } catch (error) {
        return error
    }
}