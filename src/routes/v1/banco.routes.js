import { Router } from "express";
import {
  delBanco,
  getAccountType,
  getAccount,
  getBancoId,
  getBancos,
  postBanco,
  putBanco,
  GetBancoXId,
} from "../../controllers/banco.controller.js";
import veri from "../../middleware/verification.js";

const router = Router();

router.get("/GetBancos", veri, getBancos);

router.get("/GetBanco", veri, getBancoId);

router.get("/GetAccountType", veri, getAccountType);

router.get("/GetAccount", veri, getAccount);

router.post("/CreateBanco", veri, postBanco);

router.put("/UpdateBanco", veri, putBanco);

router.put("/DeleteBanco", veri, delBanco);

router.get("/GetBancoXId/:BAN_Id", veri, GetBancoXId);

export default router;
