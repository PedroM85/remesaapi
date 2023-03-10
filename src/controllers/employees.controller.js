import { pool } from "../db/db.js";
import bcrypt from "bcryptjs";


export const getEmpleyees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sys_users')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something gows wrong'
        })
    }
}

export const getEmpleyee = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sys_users WHERE USR_Id = ?', [req.params.USR_Id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something gows wrong'
        })
    }

}

export const createEmployee = async (req, res) => {
    try {
        const { USR_Id, USR_Name, USR_Password } = req.body
        
        const encryptpass = await bcrypt.hash(USR_Password,12)

        const [rows] = await pool.query('INSERT INTO sys_users (USR_Id,USR_Name,USR_Password) VALUES (?,?,?)', [USR_Id, USR_Name, encryptpass])
        res.send({
            USR_Id,
            USR_Name,
            encryptpass
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something gows wrong'
        })
    }


}

export const updateEmployee = async (req, res) => {
    const { USR_Id } = req.params
    const { USR_Name, USR_Password } = req.body
    try {

        const UserFound = await pool.query('SELECT * FROM sys_users WHERE USR_Id = ?', [req.params.USR_Id])
        //yconsole.log(UserFound)
        // const [result] = await pool.query('UPDATE sys_users SET USR_Name = IFNULL(?, USR_Name), USR_Password = IFNULL(?,USR_Password) WHERE USR_Id = ?', [USR_Name, USR_Password, USR_Id])

        // if (result.affectedRows === 0) return res.status(404).json({
        //     message: "Employee not found"
        // })

        // const [rows] = await pool.query('SELECT * FROM sys_users WHERE USR_Id = ?', [USR_Id])

        // res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something gows wrong'
        })
    }

}

export const deleteEmployee = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM sys_users WHERE USR_Id = ?', [req.params.USR_Id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        })

        await pool.query

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something gows wrong'
        })
    }

}