import { Router } from "express";
import { KEYJWT } from "../config.js"
import jwt from "jsonwebtoken";


const veri = Router();

veri.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // console.log(token)
    if (!token) {
        res.status(401).send({
            error: 'Es necesario un token de autenticacion'
        })
        return
    }
    // console.log(token)
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        
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

export default veri