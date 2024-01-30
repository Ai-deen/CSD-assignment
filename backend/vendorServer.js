// Import required modules
import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import Product from './models/productsModel.js';
import Vendor from './models/vendorModel.js';

// Create an instance of Express router
const app2 = express.Router();

// Endpoint to get products associated with a vendor
app2.get(
  "/:id/products",
  expressAsyncHandler(async (req, res) => {
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

// Endpoint to add a new product
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

// Endpoint to get vendors with business type 'service'
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

// Endpoint to delete a product
app2.delete(
  "/:vendorid/products/:productid",
  expressAsyncHandler(async (req, res) => {
    const vendorId = req.params.vendorid;
    const productId = req.params.productid;

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

// Export the router instance
export default app2;
