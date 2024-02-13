import express from "express";
import expressAsyncHandler from "express-async-handler";
import Vendor from "../models/vendorModel.js";
import Service from "../models/serviceModel.js";
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
      shopImage,
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
      shopImage,
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

vendorRouter.get(
  "/:id/services",
  expressAsyncHandler(async (req, res) => {
    const vendorId = req.params.id;
    const services = await Service.find({ vendor: vendorId });
    if (services) {
      res.status(200).json(services);
    }
    else {
      res.status(404).send({ message: "No Services for the vendor" });
    }
  })
);

vendorRouter.put(
  "/:id/services/:serviceId/complete",
  expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.serviceId);
    if (service) {
      service.isDone = true;
      const updatedService = await service.save();
      res.send(updatedService);
    } else {
      res.status(404).send({ message: "Service not found" });
    }
  })
);


export default vendorRouter;
