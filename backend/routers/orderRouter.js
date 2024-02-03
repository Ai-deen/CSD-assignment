import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import  Order  from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();


orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req,res)=>{
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}))

const generateUniqueOrderNumber = async () => {
    try {
      const latestOrder = await Order.findOne().sort({ createdAt: -1 });
      if (!latestOrder) {
        return 1;
      }
      return latestOrder.number + 1;
    } catch (error) {
      console.error('Error generating order number:', error);
      throw new Error('Error generating order number.');
    }
};

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (!req.user._id) {
        res.status(401).send({ message: 'User not authenticated.' });
        return;
    }

    const orderNumber = await generateUniqueOrderNumber();

    const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, 
        number: orderNumber, 
    });

    const createdOrder = await order.save();

    res.status(201).send({
        message: 'New order created.',
        order: createdOrder,
    });
}));


orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send({message: "Order not found."});
    }
}))



orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updateOrder = await order.save();
        res.send({
            message: "Order paid.",
            order: updateOrder
        })
    }
    else{
        res.status(404).send({message: "Order not found."});
    }
}))


export default orderRouter;
