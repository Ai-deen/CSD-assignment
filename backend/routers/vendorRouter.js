import express from "express";
import expressAsyncHandler from "express-async-handler";
import Vendor from "../models/vendorModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../utils.js";

const vendorRouter = express.Router();

vendorRouter.get("/seed", async (req, res) => {
  // Assuming you have a vendors array for seeding
  const createdVendors = await Vendor.insertMany(vendors);
  res.send({ createdVendors });
});

vendorRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const vendor = await Vendor.findOne({ email: req.body.email });

    if (vendor) {
      if (bcrypt.compareSync(req.body.password, vendor.password)) {
        res.send({
          _id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          isAdmin: vendor.isAdmin,
          token: generateToken(vendor),
        });
        return;
      }
    }

    res.status(401).send({ message: "Invalid email or password." });
  })
);

vendorRouter.post(
  "/registerVendor",
  expressAsyncHandler(async (req, res) => {
    const {
      name,
      email,
      password,
      address,
      phoneNumber,
      shopName,
      shopAddress,
      shopLocation,
      businessTypes,
    } = req.body;
    const vendor = new Vendor({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      address,
      phoneNumber,
      shopName,
      shopAddress,
      shopLocation,
      businessTypes,
    });

    try {
      const createdVendor = await vendor.save();
      res.status(201).send({
        _id: createdVendor._id,
        name: createdVendor.name,
        email: createdVendor.email,
        isAdmin: createdVendor.isAdmin,
        token: generateToken(createdVendor),
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

vendorRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
      res.send(vendor);
    } else {
      res.status(404).send({
        message: "Vendor not found",
      });
    }
  })
);


export default vendorRouter;
