import express from "express";
import {
  addProduct,
  getAllProducts,
  getPtoductById,
  deleteProduct,
  updateById,
} from "../controllers/product.js";
import { auth,authAdmin } from "../middlwares/auth.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getPtoductById);
router.delete("/:id",authAdmin, deleteProduct);
router.put("/:id",authAdmin, updateById);
router.post("/",authAdmin, addProduct);

export default router;
