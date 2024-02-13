import express from "express";
import expressAsyncHandler from "express-async-handler";
import Service from "../models/serviceModel.js";
import { isAuth } from "../utils.js";

const serviceRouter = express.Router();
const generateUniqueOrderNumber = () => {
  // Your logic to generate a unique order number
  // Example: concatenate a prefix with a timestamp or use a random string
  return "SERVICE_" + Date.now();
};

serviceRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const services = await Service.find({ user: req.user._id });
    res.send(services);
  })
);


serviceRouter.post(
  "/place",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);
    
      const serviceNumber = generateUniqueOrderNumber();
      const service = new Service({
        serviceItems: req.body.serviceItems,
        serviceshippingAddress: req.body.serviceshippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
        vendor: req.body.vendorId,
        number: serviceNumber,
      });
      const createdService = await service.save();
      res
        .status(201)
        .send({ message: "New service created.", service: createdService });
  })
);

serviceRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.send(service);
    } else {
      res.status(404).send({ message: "Order not found." });
    }
  })
);

serviceRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
      service.isPaid = true;
      service.paidAt = Date.now();
      service.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updateService = await service.save();
      res.send({
        message: "Service paid.",
        service: updateService,
      });
    } else {
      res.status(404).send({ message: "Service not found." });
    }
  })
);

export default serviceRouter;
