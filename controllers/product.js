import mongoose from "mongoose";
import { productModel } from "../models/products.js";

export const getAllProducts = async (req, res, next) => {
  let txt = req.query.txt || undefined;
  let page = req.query.page || 1;
  let perPage = req.query.perPage || 30;
  try {
    let AllProducts = await productModel
      .find({ $or: [{ name: txt }, { code: txt }] })
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.json(AllProducts);
  } catch (err) {
    next({
      status: 400,
      type: "invalid operation",
      message: "sorry cannot get products",
    });
  }
};

export const getPtoductById = async (req, res, next) => {
  let { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("Invalid ID format");
      err.status = 400; // קוד סטטוס במקרה של שגיאה
      throw err;
    }

    let product = await productModel.findById(id);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404; // קוד סטטוס במקרה של שגיאה
      throw err;
    }

    return res.json(product);
  } catch (err) {
    next(err);
  }
};
export const deleteProduct = async (req, res, next) => {
  let { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("id not in right format");
      err.status = 400;
      throw err;
    }

    let product = await productModel.findByIdAndDelete(id);
    if (!product) {
      const err = new Error("no product with such id to delete");
      err.status = 404;
      throw err;
    }
    return res.json({ deletedProduct: product }); // החזרת האובייקט שנמחק
  } catch (err) {
    next(err);
  }
};
export const addProduct = async (req, res, next) => {
  let { code, name, ProviderCode } = req.body;

  if (!name || !code) {
    const err = new Error("חסרים פרטים בגוף הבקשה: שם או קוד מוצר");
    err.status = 400;
    return next(err);
  }

  try {
    let sameProduct = await productModel.findOne({ name: name });
    if (sameProduct) {
      const err = new Error("כבר קיים מוצר באותו שם");
      err.status = 409;
      return next(err);
    }

    let newProduct = new productModel({
      name,
      code,
      ProviderCode,
    });

    await newProduct.save();

    return res.json(newProduct);
  } catch (err) {
    err = new Error("שגיאה בתהליך הוספת המוצר");
    err.status = 500;
    return next(err);
  }
};

export const updateById = async (req, res, next) => {
  let { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("id not in right format");
      err.status = 400;
      throw err;
    }

    let product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      const err = new Error("no product with such id");
      err.status = 404;
      throw err;
    }

    return res.json(product);
  } catch (err) {
    next(err);
  }
};
