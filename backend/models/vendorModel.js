import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shopImage:{type: String, required: true},
    shopName: { type: String, required: true },
    shopAddress: { type: String, required: true },
    shopLocation: {type: String, required: true},
    businessTypes: [{ type: String, enum: ['sell', 'rent', 'service'] }]
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
