import { Router } from "express";
import {
  delCambio,
  postCambios,
  getStatus,
  postCambio,
  putCambio,
} from "../../controllers/cambio.controller.js";
import IsSalesDateOpened from "../../middleware/IsSalesDateOpened.js";
import veri from "../../middleware/verification.js";

const router = Router();

router.post("/PostCambio", veri, postCambios);

router.get("/GetStatus", veri, getStatus);

router.post("/CreateCambio", veri, IsSalesDateOpened, postCambio);

router.put("/UpdateCambio", veri, putCambio);

router.put("/DeleteCambio", veri, delCambio);

export default router;
