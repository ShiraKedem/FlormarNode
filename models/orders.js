import mongoose from "mongoose";
import Joi from "joi";

const minimalProductSchemaMongoose = mongoose.Schema({
  countproduct: Number,
  name: String,
  _id: String,
});

const orderSchemaMongoose = mongoose.Schema({
  orderDate: Date,
  dueDate: Date,
  orderDetails: [minimalProductSchemaMongoose],
  address: String,
  isCameOut: Boolean,
  userId: String,
});

export const orderModel = mongoose.model("order", orderSchemaMongoose);

const minimalProductSchema = Joi.object({
  countproduct: Joi.number().default(1),
  name: Joi.string(),
  _id: Joi.string(),
});
export const orderValidatore = (_order) => {
  const orderSchema = Joi.object({
    orderDate: Joi.date().default(Date.now()),
    dueDate: Joi.date().default(Date.now()),
    orderDetails: Joi.array()
      .items(minimalProductSchema)
      .required()
      .min(1)
      .message("At least one order detail is required"),
    address: Joi.string().required().min(2),
    isCameOut: Joi.boolean().default(false),
    _id: Joi.string(),
  });

  return orderSchema.validate(_order);
};
