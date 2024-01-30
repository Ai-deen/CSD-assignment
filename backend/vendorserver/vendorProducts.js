import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productsModel.js";

const vendorProductRouter = express.Router();

// Fetch products associated with a specific vendor
vendorProductRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const vendorId = req.params.id;
    const vendorProducts = await Product.find({ vendor: vendorId });
    
    if (vendorProducts) {
      res.send(vendorProducts);
    } else {
      res
        .status(404)
        .send({ message: "No products found for the specified vendor." });
    }
  })
);

export default vendorProductRouter;
