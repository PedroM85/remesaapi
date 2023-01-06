import { pool } from "../db/db.js";


export const getEmpleyees = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM sys_users')
    res.json(rows)
}

export const getEmpleyee = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM sys_users WHERE USR_Id = ?', [req.params.USR_Id])

    if (rows.length <= 0) return res.status(404).json({
        message: 'Employee not found'
    })
    res.json(rows[0])
}

export const createEmployee = async (req, res) => {
    const { USR_Id, USR_Name, USR_Password } = req.body
    const [rows] = await pool.query('INSERT INTO sys_users (USR_Id,USR_Name,USR_Password) VALUES (?,?,?)', [USR_Id, USR_Name, USR_Password])
    res.send({
        USR_Id: rows.insertId,
        USR_Name,
        USR_Password
    })
}

export const updateEmployee = async (req, res) => {
    const { USR_Id } = req.params
    const { USR_Name, USR_Password } = req.body


    const [result] = await pool.query('UPDATE sys_users SET USR_Name = IFNULL(?, USR_Name), USR_Password = IFNULL(?,USR_Password) WHERE USR_Id = ?', [USR_Name, USR_Password, USR_Id])

    if (result.affectedRows === 0) return res.status(404).json({
        message: "Employee not found"
    })

    const [rows] = await pool.query('SELECT * FROM sys_users WHERE USR_Id = ?', [USR_Id])
    
    res.json(rows[0])
}

export const deleteEmployee = async (req, res) => {
    const [result] = await pool.query('DELETE FROM sys_users WHERE USR_Id = ?', [req.params.USR_Id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Employee not found'
    })

    await pool.query

    res.sendStatus(204)
}