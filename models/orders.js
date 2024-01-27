import mongoose from "mongoose";
import { productSchema } from "products";

const minimalUserSchema = mongoose.Schema({
  userNme: String,
  email: { type: String, unique: false },
});


const orderSchema = mongoose.Schema({
  orderDate: { type: Date, default: Date.now() },
  DueDate: { type: Date, default: Date.now() },
  orderDetails: [minimalUserSchema],
  address: String,
  products: [productSchema],
});
export const orderModel = mongoose.model("order", orderSchema);
