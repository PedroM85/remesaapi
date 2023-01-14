import Express from "express";
import v1 from "./apiversion.js";
import "./config.js";
import Openning from "./routes/v1/opennin.routes.js";
import employeesRoutes from "./routes/v1/employees.routes.js";
import indexRoutes from "./routes/v1/index.routes.js";
import loginIn from "./routes/v1/login.routes.js"



const app = Express()

app.use(Express.json())
//login 
app.use(v1, loginIn)
//Ruta prueba
app.use(v1, indexRoutes)
//tema de usuarios del sistema
app.use(v1, employeesRoutes)
//Apetura del dia
app.use(v1, Openning)


app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
    next
})

export default app;