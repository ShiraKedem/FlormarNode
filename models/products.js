
import Joi from "joi";
import mongoose from "mongoose";

export const productValidatore = (_product) => {
const joiProductsSchema = Joi.object({
    name: Joi.string().min(2).required(),
    Providercode: Joi.string().min(1).required(),
    code: Joi.string().min(1).max(15).required()
});
  return joiProductsSchema.validate(_product);
  };

  


const productSchema = mongoose.Schema({
    name: String,
    Providercode: String,
    code: String,
    Description:String,
    DateProduction:Date,
    image:String,

});
export const productModel = mongoose.model("product", productSchema);