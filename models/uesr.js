import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: { type: String, unique: false },
    
})
export const userModel = mongoose.model("user", userSchema);
