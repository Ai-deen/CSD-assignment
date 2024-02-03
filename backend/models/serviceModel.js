import mongoose from "mongoose";

const serviceModelSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["service"],
      default: "service",
    },
    gadgetName: {
      type: String,
      required: true,
    },
    gadgetBrand: {
      type: String,
      required: true,
    },
    gadgetImage: {
      type: String,
      required: true,
    },
    issueDescription: {
      type: String,
      required: true,
    },
    // Additional fields specific to electronic gadgets service
    serialNumber: {
      type: String,
      required: true,
    },
    warrantyStatus: {
      type: Boolean,
      default: false,
    },
    // Add more specific fields as needed
    // ...

    // Common fields with the general order schema
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model("ServiceModel", serviceModelSchema);

export default ServiceModel;
