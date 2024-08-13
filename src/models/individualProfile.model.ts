import { PROFILE_TYPES } from "@/constants/profile-types";
import { VERFICATION_ID_TYPES } from "@/constants/verificationIdTypes";
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

const verificationIdSchema = new mongoose.Schema(
  {
    idType: {
      type: String,
      enum: [
        VERFICATION_ID_TYPES.ADHAAR_CARD,
        VERFICATION_ID_TYPES.DRIVING_LICENSE,
        VERFICATION_ID_TYPES.PASSPORT,
        VERFICATION_ID_TYPES.VOTER_ID_CARD,
        VERFICATION_ID_TYPES.OTHER,
      ],
    },
    idNumber: {
      type: String,
    },
    placeOfIssue: {
      type: String,
    },
    dateOfIssue: {
      type: String,
    },
    dateOfExpiry: {
      type: String,
    },
  },
  { _id: false }
);

const individualProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profileType: {
      type: String,
      enum: [PROFILE_TYPES.INDIVIDUAL, PROFILE_TYPES.COMPANY],
      default: PROFILE_TYPES.INDIVIDUAL,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    dob: {
      type: String,
    },
    address: addressSchema,
    verificationIdDetails: verificationIdSchema,
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  {
    timestamps: true,
  }
);

const IndividualProfile =
  mongoose.models.IndividualProfile ||
  mongoose.model("IndividualProfile", individualProfileSchema);

export default IndividualProfile;
