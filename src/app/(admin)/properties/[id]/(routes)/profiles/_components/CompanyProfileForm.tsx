"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DateInput from "@/components/ui/shared/date-input";
import LoadingButton from "@/components/ui/shared/loading-button";
import SelectInput from "@/components/ui/shared/select-input";
import TextInput from "@/components/ui/shared/TextInput";
import axiosInstance from "@/utils/axios-instance";
import { countries } from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CompanyProfileFormSchema = z.object({
  companyName: z.string(),
  companyCode: z.string().optional(),
  companyEmail: z.string().email(),
  companyPhone: z.string(),
  headOfficeAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
  }),
  billingAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
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
  // verificationDetails: z.object({
  //   regNumber: z.string().optional(),
  //   regCert: z.string().optional(),
  //   regDate: z.string().refine(
  //     (value) => {
  //       if (value === "") return true; // Allow blank string
  //       const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/;
  //       return regex.test(value);
  //     },
  //     { message: "Invalid date" }
  //   ),
  //   regCountry: z.string().optional(),
  // }),
  // notes: z.string().optional(),
  isSuspended: z.boolean().optional(),
});

const CompanyProfileForm = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CompanyProfileFormSchema>>({
    resolver: zodResolver(CompanyProfileFormSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyCode: "",
      headOfficeAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      billingAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      gstDetails: {
        beneficiaryName: "",
        GSTIN: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
      },
      isSuspended: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof CompanyProfileFormSchema>) => {
    console.log(values);

    try {
      const response = await axiosInstance.post(
        `/api/profiles/company-profiles?propertyId=${propertyId}`,
        values
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      form.reset();

      router.refresh();
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            <TextInput
              label="Company Name"
              control={form.control}
              type="text"
              name="companyName"
            />
            <TextInput
              label="Company Email"
              control={form.control}
              type="email"
              name="companyEmail"
            />
            <TextInput
              label="Company Phone"
              control={form.control}
              type="text"
              name="companyPhone"
            />
            <TextInput
              label="Company Code"
              control={form.control}
              type="text"
              name="companyCode"
            />
          </div>
          <hr className="my-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            <TextInput
              label="Street"
              control={form.control}
              type="text"
              name="officeAddress.street"
            />
            <TextInput
              label="City"
              control={form.control}
              type="text"
              name="officeAddress.city"
            />
            <TextInput
              label="State"
              control={form.control}
              type="text"
              name="officeAddress.state"
            />
            <SelectInput
              label="Country"
              control={form.control}
              name="officeAddress.country"
              options={countries.map((country) => ({
                key: country.name,
                value: country.name,
              }))}
            />
            <TextInput
              label="Zip"
              control={form.control}
              type="text"
              name="officeAddress.zip"
            />
          </div>
          <hr className="my-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 justify-start">
            <TextInput
              label="Street"
              control={form.control}
              type="text"
              name="billingAddress.street"
            />
            <TextInput
              label="City"
              control={form.control}
              type="text"
              name="billingAddress.city"
            />
            <TextInput
              label="State"
              control={form.control}
              type="text"
              name="billingAddress.state"
            />
            <SelectInput
              label="Country"
              control={form.control}
              name="billingAddress.country"
              options={countries.map((country) => ({
                key: country.name,
                value: country.name,
              }))}
            />
            <TextInput
              label="Zip"
              control={form.control}
              type="text"
              name="billingAddress.zip"
            />
          </div>
          <hr className="my-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 justify-start">
            <TextInput
              label="Beneficiary"
              control={form.control}
              type="text"
              name="companyGST.beneficiary"
            />
            <TextInput
              label="GSTIN"
              control={form.control}
              type="text"
              name="companyGST.gstin"
            />
            <TextInput
              label="Address Line 1"
              control={form.control}
              type="text"
              name="companyGST.addressLine1"
            />
            <TextInput
              label="Address Line 2"
              control={form.control}
              type="text"
              name="companyGST.addressLine2"
            />
            <TextInput
              label="City"
              control={form.control}
              type="text"
              name="companyGST.city"
            />
            <TextInput
              label="State"
              control={form.control}
              type="text"
              name="companyGST.state"
            />
            <TextInput
              label="Pincode"
              control={form.control}
              type="text"
              name="companyGST.pincode"
            />
          </div>
          <div className="self-end flex items-center justify-end gap-4 mt-10">
            <Button type="reset" variant="destructive">
              Reset
            </Button>
            <LoadingButton
              loadingText="Creating Profile"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Submit
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyProfileForm;
