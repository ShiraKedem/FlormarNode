import mongoose from "mongoose";
import { orderModel, orderValidatore } from "../models/orders.js";
export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await orderModel.find();
    res.json(allOrders);
  } catch (err) {
    next({
      status: 400,
      type: "invalid operation",
      message: "Sorry, cannot get orders",
    });
  }
};

export const addOrder = async (req, res, next) => {
  const { orderDetails, address, isCameOut } = req.body;
  const result = await orderValidatore(req.body);
 
  if (result.error) {
    return res.status(400).json({
      type: "invalid data",
      message: result.error.details[0].message,
    });
  }
  try {
    let newOrder = new orderModel({
      orderDetails,
      address,
      isCameOut,
      userId: req.user._id,
    });

    await newOrder.save();

    return res.json(newOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  let { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("id not in right format");
      err.status = 400;
      throw err;
    }
    let order = await orderModel.findById(id);

    if (!order) {
      const err = new Error("no order with such id to delete");
      err.status = 404;
      throw err;
    }
    if (order.isCameOut)
      return res.status(400).json({
        type: "the order com out",
        message: "the order came out and cannot be deleted",
      });
    if (req.user.role == "ADMIN") {
      order = await orderModel.findByIdAndDelete(id);
      return res.json({ deleteOrder: order });
    }

    if (order.userId != req.user._id) {
      return res.status(400).json({
        type: "not allowed",
        message: "the user is not allowed to delete this order",
      });
    }

    order = await orderModel.findByIdAndDelete(id);
    return res.json({ deleteOrder: order }); // החזרת האובייקט שנמחק
  } catch (err) {
    next(err);
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
    const updatedData = { ...req.body, isCameOut: true };
    let order = await orderModel.findByIdAndUpdate(id,updatedData , {
      new: true,
    });
    if (!order) {
      const err = new Error("no order with such id");
      err.status = 404;
      throw err;
    }
    return res.json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  
  try {

    let allOrders = await orderModel.find({userId:req.user._id} )
    res.json(allOrders)
}
   catch (err) {
    next(err);
  }
};
