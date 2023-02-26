import { Router } from "express";
import veri from "../../middleware/verification.js";
import SalesDateOpened from "../../middleware/IsSalesDateOpened.js";
import {
  getLogin,
  getInfo,
  postRegisterLogout,
  postRegisterLogin,
} from "../../controllers/login.controller.js";

const router = Router();

router.post("/loginIn", getLogin);

router.post("/RegisterLogin", postRegisterLogin);

router.post("/RegisterLogout", postRegisterLogout);

router.get("/info", veri, SalesDateOpened, getInfo);

export default router;
