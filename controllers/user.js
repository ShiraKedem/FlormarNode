import { generateToken, userModel } from "../models/user.js"; // תיקון כאן
import bcrypt from "bcrypt";
import { userValidatore } from "../models/user.js";

export const addUser = async (req, res, next) => {
  let { email, password, userName } = req.body;

  const result = await userValidatore(req.body);

  if (result.error) {
    return res.status(400).json({
      type: "invalid data",
      message: result.error.details[0].message,
    });
  }
  try {
    const sameUser = await userModel.findOne({ email: email });
    if (sameUser) {
      const err = new Error("user with such email already exists");
      err.status = 409;
      throw err;
    }

    let hashedPassword = await bcrypt.hash(password, 15);

    let newUser = new userModel({
      email,
      password: hashedPassword,
      userName,
      role: "USER",
    });

    await newUser.save();

    let token = generateToken(newUser._id, newUser.role, newUser.userName);

    return res.json({
      _id: newUser._id,
      userName: newUser.userName,
      token,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  let { password, email } = req.body;
  if (!email || !password) {
    const err = new Error("please send email user name and password");
    err.status = 404;
    throw err;
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      const err = new Error("one or more details are invalid");
      err.status = 404;
      throw err;
    }
    if (!(await bcrypt.compare(password, user.password))) {
      const err = new Error("one or more details are invalid");
      err.status = 404;
      throw err;
    }
    let token = generateToken(user._id, user.role, user.userName);
    return res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    let allUsers = await userModel.find({}, "-password");
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
};
