import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import vendorRouter from "./routers/vendorRouter.js";
import vendorServer from "./vendorServer.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import deliveryRouter from "./routers/deliveryRouter.js";
import serviceRouter from "./routers/serviceRouter.js";
import adminRouter from "./routers/adminRouter.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const connection_url = process.env.MONGO_URI;

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/vendors", vendorRouter);
app.use("/vs", vendorServer);
app.use("/api/services", serviceRouter);
app.use("/api/delivery", deliveryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/as",adminRouter)

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/", (req, res) => res.status(200).send("working fine"));

// Listening to  server

app.listen(port, () => console.log(`Listening on local host:${port}`));
