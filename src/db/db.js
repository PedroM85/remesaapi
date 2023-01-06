import { createPool } from "mysql2/promise";

export const pool= createPool({
    host:'168.181.187.165',
    user: 'Mam',
    password: 'mZKa6a6YrOuAxBey',
    port:3306,
    database: 'unelsoft_remesa'

})