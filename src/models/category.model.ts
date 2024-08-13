import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
