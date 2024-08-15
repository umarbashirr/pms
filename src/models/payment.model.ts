import { PAY_TYPES } from "@/constants/payment";
import mongoose, { mongo } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    payType: {
      type: String,
      enum: [
        PAY_TYPES.CASH,
        PAY_TYPES.CREDIT_CARD,
        PAY_TYPES.AMEX,
        PAY_TYPES.BANK_TRANSFER,
        PAY_TYPES.CHEQUE,
        PAY_TYPES.ONLINE,
        PAY_TYPES.NET_BANKING,
        PAY_TYPES.UPI,
      ],
    },
    amount: {
      type: Number,
      default: 0,
    },
    isVoid: {
      type: Boolean,
      default: false,
    },
    transactionId: String,
    remarks: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
