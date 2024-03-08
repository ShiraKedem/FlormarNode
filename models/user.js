import mongoose from "mongoose";
// import Joi from "joi";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  email: { type: String, unique: false },
  role: String,
  datSign: Date,
});
export const userModel = mongoose.model("user", userSchema);

export const userValidatore = (_user) => {
  const userSchema = Joi.object({
    datSign: Joi.date().default(Date.now()),
    userName: Joi.string().required().min(2),
    password: Joi.string().required().min(6).max(10),
    email: Joi.string().email().required(),
  });

  return userSchema.validate(_user);
};

export const generateToken = (_id, role, userName) => {
  let token = jwt.sign({ _id, role, userName }, process.env.SECRET_JWT, {
    expiresIn: "46h",
  });
  return token;
};
