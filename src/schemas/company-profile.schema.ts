import { z } from "zod";

export const CompanyProfileFormSchema = z.object({
  companyName: z.string(),
  companyCode: z.string().optional(),
  companyEmail: z.string().email(),
  companyPhone: z.string(),
  profileType: z.string(),
  headOfficeAddress: z.object({
    locality: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  billingAddress: z.object({
    locality: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  gstDetails: z.object({
    beneficiaryName: z.string().optional(),
    GSTIN: z.string().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  propertyRef: z.string(),
});
