import express from "express";
import {
  addOrder,deleteOrder,updateById,getAllOrders,getOrderById
} from "../controllers/orders.js";
import { auth,authAdmin } from "../middlwares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", auth,addOrder);
orderRouter.get("/", getAllOrders);
orderRouter.delete("/:id",auth,deleteOrder);

orderRouter.put("/:id",authAdmin, updateById);
orderRouter.get("/:id", auth,getOrderById);
export default orderRouter;
