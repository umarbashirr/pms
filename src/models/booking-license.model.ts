import {
  BOOKING_LICENSE_STATUS,
  PRODUCT_TYPES,
} from "@/constants/booking-license";
import { PROFILE_TYPES } from "@/constants/profile-types";
import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    baseAmount: Number,
    taxAmount: Number,
    discountAmount: Number,
    cancellationAmount: Number,
    totalAmount: Number,
    totalAmountAfterDiscount: Number,
  },
  {
    _id: false,
  }
);

const statusSchema = new mongoose.Schema(
  {
    currentStatus: {
      type: String,
      enum: [
        BOOKING_LICENSE_STATUS.NOT_STARTED,
        BOOKING_LICENSE_STATUS.STARTED,
        BOOKING_LICENSE_STATUS.COMPLETED,
        BOOKING_LICENSE_STATUS.CANCELLED,
      ],
      default: BOOKING_LICENSE_STATUS.NOT_STARTED,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      enum: [PRODUCT_TYPES.ROOM, PRODUCT_TYPES.ADDON, PRODUCT_TYPES.EXPENSE],
    },
    count: {
      type: Number,
      default: 1,
    },
    roomCategoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    _id: false,
  }
);

const assignedRoomSchema = new mongoose.Schema(
  {
    roomDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
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

const bookingLicenseSchema = new mongoose.Schema(
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
    checkInDate: {
      type: String,
    },
    checkOutDate: {
      type: String,
    },
    price: priceSchema,
    status: statusSchema,
    remarks: {
      type: String,
    },
    product: productSchema,
    assingedRoom: assignedRoomSchema,
    checkedInGuests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualProfile",
      },
    ],
    primaryGuest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndividualProfile",
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    bookingId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const BookingLicense =
  mongoose.models.BookingLicense ||
  mongoose.model("BookingLicense", bookingLicenseSchema);

export default BookingLicense;
