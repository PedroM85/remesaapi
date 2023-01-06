import Express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = Express()

app.use(Express.json())

app.use('/api', indexRoutes)
app.use('/api', employeesRoutes)

app.listen(3000)
console.log("server Running")
