import { Router } from "express";
import jwt from "jsonwebtoken";
import { KEYJWT } from "../../config.js"
import SalesDateOpened from "../../middleware/IsSalesDateOpened.js";
import { getLogin, getInfo, postRegisterLogout, postRegisterLogin, isopenning } from "../../controllers/login.controller.js";

const router = Router();

const verificacion = Router();

router.post('/loginIn', getLogin);

router.post('/RegisterLogin', postRegisterLogin);

router.post('/RegisterLogout', postRegisterLogout);

// router.get('/info', getInfo);
router.get('/info', verificacion, SalesDateOpened, getInfo);

router.get('/isopen', isopenning )

verificacion.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        res.status(401).send({
            error: 'Es necesario un token de autenticacion'
        })
        return
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        console.log(token);
    }
    if (token) {
        jwt.verify(token, KEYJWT, (error, decoded) => {
            if (error) {
                return res.json({
                    message: 'El token no es valido'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
});


export default router