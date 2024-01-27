import express from "express";
import {
  addProduct,
  getAllProducts,
  getPtoductById,
  deleteProduct,
  updateById,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getPtoductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateById);
router.post("/", addProduct);

export default router;
