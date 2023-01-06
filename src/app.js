import Express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";

import "./config.js";


const app = Express()

app.use(Express.json())

app.use('/api', indexRoutes)
app.use('/api', employeesRoutes)

app.use((req,res, next)=>{
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;