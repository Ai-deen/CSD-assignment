import mongoose from "mongoose";

const deliveryPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    vehicleInfo: { type: String, required: true },
    // You can include other relevant fields such as:
    // - Current location
    // - Availability
    // - Delivery vehicle information
    // - Any other relevant information about the delivery person

    // For simplicity, let's assume a delivery person can have multiple orders assigned to them
    // assignedOrders: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Order",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const DeliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);

export default DeliveryPerson;
