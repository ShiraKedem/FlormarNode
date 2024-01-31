import express from "express";
import { addUser, getAllUsers, login } from "../controllers/user.js";

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.post("/", addUser);
userRouter.post("/login", login);

export  {userRouter} ;
