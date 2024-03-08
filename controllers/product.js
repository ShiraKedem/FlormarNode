import mongoose from "mongoose";
import { productModel,productValidatore } from "../models/products.js";

export const getAllProducts = async (req, res, next) => {
  try {
    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 5;

    let AllProducts;

    if (!txt) {
      AllProducts = await productModel.find().skip((page - 1) * perPage)
      .limit(perPage);
    } else {
      AllProducts = await productModel
        .find({ $or: [{ name: txt }, { code: txt }] })
        .skip((page - 1) * perPage)
        .limit(perPage);
    }
  
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
  let {  name, Providercode ,price} = req.body;
  const result = await productValidatore(req.body);

  if (result.error) {
    return res.status(400).json({
      type: "invalid data",
      message: result.error.details[0].message,
    });
  }

  // const { image } = req.files;
  try {
    let sameProduct = await productModel.findOne({ name: name });
    if (sameProduct) {
      const err = new Error("כבר קיים מוצר באותו שם");
      err.status = 409;
      return next(err);
    }

    let newProduct = new productModel({
      name,
      price,
      Providercode,
      // image: {
      //   data: fs.readFileSync(image.path),
      //   contentType: image.mimetype,
      // },
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
