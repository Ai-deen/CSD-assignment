import express from 'express'
import mongoose from 'mongoose'
import expressAsyncHandler from "express-async-handler";
import Product from './models/productsModel.js'

const app2 = express.Router();

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
        numRev
      } = req.body;
      const product = new Product({
        name,
        image,
        brand,
        category,
        description,
        price,
        stock,
        rating,
        numRev
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

export default app2;