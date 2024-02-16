import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'; 
import Vendor from '../models/vendorModel.js'; 
import Order from '../models/orderModel.js'; 
import DeliveryPerson from '../models/deliveryPersonModel.js';
// import { isAuth } from '../utils.js';
import Product from '../models/productsModel.js';

const adminRouter = express.Router();

adminRouter.get('/users', expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
}));

adminRouter.get('/vendors', expressAsyncHandler(async (req, res) => {
    const vendors = await Vendor.find({});
    res.json(vendors);
}));

adminRouter.get('/deliverypeople', expressAsyncHandler(async (req, res) => {
    const deliveryPeople = await DeliveryPerson.find({});
    res.json(deliveryPeople);
}));

adminRouter.get('/users/:id/orders',expressAsyncHandler(async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters

    // Find the user by ID to ensure it exists
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // Find all orders associated with the user ID
    const orders = await Order.find({ user: userId });
    res.json(orders);
}));

adminRouter.get('/vendors/:id/products', expressAsyncHandler(async (req, res) => {
    const vendorId = req.params.id; // Get the user ID from the request parameters

    // Find the user by ID to ensure it exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
        res.status(404).json({ message: 'vendor not found' });
        return;
    }

    // Find all orders associated with the user ID
    const products = await Product.find({ vendor: vendorId });
    res.json(products);
}));

// Route to delete a product by ID
adminRouter.delete('/products/:id', expressAsyncHandler(async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters

    // Find the product by ID to ensure it exists
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    // If the product exists, delete it
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
}));


// Route to delete a user by ID
adminRouter.delete('/users/:id', expressAsyncHandler(async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters

    // Find the user by ID to ensure it exists
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // If the user exists, delete it
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
}));


// Route to delete a vendor by ID
adminRouter.delete('/vendors/:id', expressAsyncHandler(async (req, res) => {
    const vendorId = req.params.id; // Get the user ID from the request parameters

    // Find the user by ID to ensure it exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // If the user exists, delete it
    await Vendor.findByIdAndDelete(vendorId);
    res.status(200).json({ message: 'Vendor deleted successfully' });
}));

// Route to delete a courier by ID
adminRouter.delete('/deliverypeople/:id', expressAsyncHandler(async (req, res) => {
    const deliveryPeopleId = req.params.id; // Get the person ID from the request parameters

    // Find the user by ID to ensure it exists
    const deliveryPeople = await DeliveryPerson.findById(deliveryPeopleId);
    if (!deliveryPeople) {
        res.status(404).json({ message: 'Delivery Person not found' });
        return;
    }

    // If the user exists, delete it
    await DeliveryPerson.findByIdAndDelete(deliveryPeopleId);
    res.status(200).json({ message: 'Delivery Person deleted successfully' });
}));

export default adminRouter;