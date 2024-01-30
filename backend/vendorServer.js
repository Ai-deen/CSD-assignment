import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
<<<<<<< HEAD
import Product from './models/productsModel.js'
import Vendor from './models/vendorModel.js';
=======
import Product from "./models/productsModel.js";
>>>>>>> Srinidhi

const app2 = express.Router();

app2.get(
  "/:id/products",
  expressAsyncHandler(async (req, res) => {
    // const vendorId = req.body.vendorId;
    const vendorId = req.params.id;

    try {
      // Retrieve products associated with the vendor
      const products = await Product.find({ vendor: vendorId });
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching vendor products:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);


app2.post(
  "/postProduct",
  expressAsyncHandler(async (req, res) => {
    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      stock,
      rating,
      numRev,
    } = req.body;
    const vendorId = req.body.vendorId;
    const product = new Product({
      name,
      image,
      brand,
      category,
      description,
      price,
      stock,
      rating,
      numRev,
      vendor: vendorId,
    });

    try {
      const createdProduct = await product.save();
      res.status(201).send({
        _id: createdProduct._id,
        name: createdProduct.name,
        image: createdProduct.image,
        description: createdProduct.description,
        brand: createdProduct.brand,
        price: createdProduct.price,
        //   isAdmin: createdProduct.isAdmin,
        //   token: generateToken(createdVendor),
      });
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        res.status(400).json({ message: errors.join(", ") });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  })
);

<<<<<<< HEAD
  app2.get(
    '/getVendorsByService',
    expressAsyncHandler(async (req, res) => {
      try {
        const vendors = await Vendor.find({ businessTypes: 'service' });
        res.status(200).json(vendors);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    })
  );

export default app2;
=======

app2.delete(
  "/:vendorid/products/:productid",
  expressAsyncHandler(async (req, res) => {
    const vendorId = req.params.vendorid;
    const productId = req.params.productid;

    // Perform any necessary validation or checks here...

    try {
      // Find the product by ID and remove it, ensuring it belongs to the specified vendor
      const product = await Product.findOne({
        _id: productId,
        vendor: vendorId,
      });

      if (product) {
        await product.remove();
        res.status(200).send({ message: "Product deleted successfully" });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);


export default app2;
>>>>>>> Srinidhi
