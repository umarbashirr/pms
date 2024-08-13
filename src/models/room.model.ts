import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, trim: true },
    code: {
      type: String,
      trim: true,
    },
    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
