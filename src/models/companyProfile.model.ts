import { PROFILE_TYPES } from "@/constants/profile-types";
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

const companyProfileSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    companyCode: {
      type: String,
      trim: true,
    },
    profileType: {
      type: String,
      enum: [PROFILE_TYPES.INDIVIDUAL, PROFILE_TYPES.COMPANY],
      default: PROFILE_TYPES.COMPANY,
    },
    companyEmail: String,
    companyPhone: String,
    gstDetails: gstDetailSchema,
    billingAddress: addressSchema,
    headOfficeAddress: addressSchema,
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  {
    timestamps: true,
  }
);

const CompanyProfile =
  mongoose.models.CompanyProfile ||
  mongoose.model("CompanyProfile", companyProfileSchema);

export default CompanyProfile;
