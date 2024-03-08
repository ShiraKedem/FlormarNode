import Joi from "joi";
import mongoose from "mongoose";

export const productValidatore = (_product) => {
  const joiProductsSchema = Joi.object({
    name: Joi.string().min(2).required(),
    Providercode: Joi.string().required(),
    price: Joi.number().required(),
    src: Joi.string(),
    DateProduction: Joi.string(),
  });
  return joiProductsSchema.validate(_product);
};

const productSchema = mongoose.Schema({
  name: String,
  Providercode: String,
  Description: String,
  DateProduction: Date,

  price: Number,
  src: String,
});
export const productModel = mongoose.model("product", productSchema);
