import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    number: { type: Number, unique: true },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        number: { type: Number, unique: true },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalcode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ number: 1 }, { unique: true }); // Add this line to create a unique index on the 'number' field

// Middleware to generate and assign a unique order number before saving
orderSchema.pre('save', async function (next) {
  try {
    if (!this.number) {
      const latestOrder = await mongoose.model('Order').findOne().sort({ createdAt: -1 });

      if (!latestOrder || !latestOrder.number) {
        this.number = 1; // If no orders exist or the number is not available, start with 1
      } else {
        this.number = latestOrder.number + 1; // Increment the last order number
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model('Order', orderSchema);

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const createdOrder = await order.save();
    res.status(201).send({ message: 'New order created.', order: createdOrder });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.number) {
      // Handle duplicate key error for the number field
      res.status(500).send({ message: 'Duplicate order number. Handle accordingly.' });
    } else {
      res.status(500).send({ message: 'Error creating order.', error: error.message });
    }
  }
};


export default Order ;
