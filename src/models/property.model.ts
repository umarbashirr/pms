import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    locality: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  {
    _id: false,
  }
);

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    landline: {
      type: String,
    },
    address: addressSchema,
    checkIn: {
      type: String,
      default: "14:00",
    },
    checkOut: {
      type: String,
      default: "11:00",
    },
  },
  {
    timestamps: true,
  }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
