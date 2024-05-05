import express from "express";
import {
  allOrders,
  myOrders,
  placeOrder,
  singleOrder,
  stats,
  statusUpdate,
} from "../controllers/order.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/place", isAuthenticated, placeOrder);
router.get("/all", isAuthenticated, allOrders);
router.get("/my", isAuthenticated, myOrders);
router.get("/stats", isAuthenticated, stats);
router.route("/:id", isAuthenticated).get(singleOrder).put(statusUpdate);

export default router;
