import Express from "express";
import v1 from "./apiversion.js";
import employeesRoutes from "./routes/v1/employees.routes.js";
import indexRoutes from "./routes/v1/index.routes.js";
import "./config.js";


const app = Express()

app.use(Express.json())

app.use(v1, indexRoutes)
app.use(v1, employeesRoutes)

app.use((req,res, next)=>{
    res.status(404).json({
        message: 'Endpoint not found'
    })
    next
})

export default app;