import { Router } from "express";
import veri from "../../middleware/verification.js";
import {
  PostCounter,
  PostCloseSalesDate,
  PostOpenSalesDate,
  PostPaymentTypePerSession,
  PostReOpenSession,
  PostSessionInfo,
} from "../../controllers/salessession.controller.js";

const router = Router();

router.post("/PostSessionInfo", veri, PostSessionInfo);

router.post("/PostCloseSalesDate", veri, PostCloseSalesDate);

router.post("/PostOpenSalesDate", veri, PostOpenSalesDate);

router.post("/PostReOpenSalesDate", veri, PostReOpenSession);

router.post("/PostPaymentTypePerSession", veri, PostPaymentTypePerSession);

router.post("/PostCounter", veri, PostCounter);

export default router;
