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

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    address: addressSchema,
    properties: [
      {
        role: {
          type: String,
          enum: ["FO", "HM", "AD", "BOT"],
          default: "FO",
        },
        property: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
