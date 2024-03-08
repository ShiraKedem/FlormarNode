import express from "express";
import router from "./routes/products.js";
import { config } from "dotenv";
import { connectToDB } from "./db/connectToDB.js";
import cors from "cors";
import { errorHandling } from "./middlwares/erroreHndling.js";

import {userRouter}  from "./routes/user.js";
import orderRouter from "./routes/orders.js"


const app = express();
app.use(cors());
app.use(express.json());

connectToDB();
config();
app.use("/api/product", router);
app.use("/api/user",userRouter)
app.use("/api/order",orderRouter)
app.use(errorHandling )
app.use(express.static("files"))

let port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

