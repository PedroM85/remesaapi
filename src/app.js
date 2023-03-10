import Express from "express";
import v1 from "./apiversion.js";
import Openning from "./routes/v1/opennin.routes.js";
import employeesRoutes from "./routes/v1/employees.routes.js";
import indexRoutes from "./routes/v1/index.routes.js";
import login from "./routes/v1/login.routes.js";
import GetTasa from "./routes/v1/tasa.routes.js";
import GetSocio from "./routes/v1/socio.routes.js";
import GetCli from "./routes/v1/cliente.routes.js";
import getBancos from "./routes/v1/banco.routes.js";
import getCambios from "./routes/v1/cambio.routes.js";
import Dashboard from "./routes/v1/dashboard.routes.js";
import gasto from "./routes/v1/gasto.routes.js";
import bancoso from "./routes/v1/bancoso.routes.js";
import Session from "./routes/v1/salessession.routes.js";

const app = Express();

app.use(Express.json());
//login
app.use(v1, login);
//Ruta prueba
app.use(v1, indexRoutes);
//tema de usuarios del sistema
app.use(v1, employeesRoutes);
//Apetura del dia
app.use(v1, Openning);
//Objecto Tasa
app.use(v1, GetTasa);
//Socios
app.use(v1, GetSocio);
//Cliente
app.use(v1, GetCli);
//Banco
app.use(v1, getBancos);
//Cambios
app.use(v1, getCambios);
//Dashboard
app.use(v1, Dashboard);
//Gasto
app.use(v1, gasto);
//Banco Socios
app.use(v1, bancoso);
//Session
app.use(v1, Session);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Aca no tienes nada",
  });
  next;
});

export default app;
