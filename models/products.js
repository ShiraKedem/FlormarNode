
import Joi from "joi";
import mongoose from "mongoose";

const joiProductsSchema = Joi.object({
    name: Joi.string().min(2).required(),
    Providercode: Joi.string().required(),
    code: Joi.string().required()
});

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const validationResult = joiProductsSchema.validate({ name: value });
                if (validationResult.error) {
                    if (validationResult.error.details[0].context.key === 'name') {
                        console.error("Validation Error for 'name':", validationResult.error.message);
                        throw new Error("Validation Error for 'name': " + validationResult.error.message);
                    }
                }
                return true;
            },
        },
    },
    Providercode: String,
    code: String
});
export const productModel = mongoose.model("product", productSchema);