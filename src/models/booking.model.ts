import {
  BOOKING_LICENSE_STATUS,
  BOOKING_PAYTYPE,
  BOOKING_SOURCE_TAGS,
  BOOKING_STATUS,
} from "@/constants/booking-license";
import { PAY_TYPES } from "@/constants/payment";
import { PROFILE_TYPES } from "@/constants/profile-types";
import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    currentStatus: {
      type: String,
      enum: [BOOKING_STATUS.OPEN, BOOKING_STATUS.CLOSED],
      default: BOOKING_LICENSE_STATUS.NOT_STARTED,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const gstDetailSchema = new mongoose.Schema(
  {
    beneficiaryName: String,
    GSTIN: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
  },
  {
    _id: false,
  }
);

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
  },
  { _id: false, timestamps: true }
);

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      booker: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "customerType",
      },
      bookerType: {
        type: String,
        enum: [PROFILE_TYPES.INDIVIDUAL, PROFILE_TYPES.COMPANY],
      },
    },
    customerType: {
      type: String,
      enum: ["IndividualProfile", "CompanyProfile"],
    },
    primaryGuest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndividualProfile",
    },
    masterGuestList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualProfile",
      },
    ],
    bookingLicenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingLicense",
      },
    ],
    gstOtherThanBooker: gstDetailSchema,
    invoiceRemarks: String,
    status: statusSchema,
    bookingSource: {
      type: String,
      enum: [
        BOOKING_SOURCE_TAGS.WALK_IN,
        BOOKING_SOURCE_TAGS.PHONE_EMAIL,
        BOOKING_SOURCE_TAGS.OTA,
        BOOKING_SOURCE_TAGS.TRAVEL_AGENT,
        BOOKING_SOURCE_TAGS.MICE,
        BOOKING_SOURCE_TAGS.CORPORATE,
        BOOKING_SOURCE_TAGS.CHARTER,
      ],
    },
    payments: [paymentSchema],
    payType: {
      type: String,
      enum: [
        BOOKING_PAYTYPE.DIRECT,
        BOOKING_PAYTYPE.BILL_TO_COMPANY,
        BOOKING_PAYTYPE.PARTIAL,
        BOOKING_PAYTYPE.ADHOC,
      ],
    },
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    bookingId: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// bookingSchema.pre("save", async function (next) {
//   const booking = this;
//   if (booking.isNew) {
//     try {
//       const count = await Booking.countDocuments();
//       booking.bookingId = count + 1;
//       next();
//     } catch (error: any) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
