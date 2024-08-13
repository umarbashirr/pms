import verifyJWTToken from "@/helpers/verify-jwt-token";
import CompanyProfile from "@/models/companyProfile.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();

    const {
      companyName,
      companyCode,
      companyEmail,
      companyPhone,
      gstDetails,
      billingAddress,
      headOfficeAddress,
      propertyRef,
    } = await req.json();

    const decodedUser = await verifyJWTToken(req);

    if (!decodedUser.success) {
      return NextResponse.json(
        {
          message: "Access denied!",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const updatedCompany = await CompanyProfile.findOneAndUpdate(
      {
        _id: params?.id,
        propertyRef,
      },
      {
        companyName,
        companyCode,
        companyEmail,
        companyPhone,
        gstDetails,
        billingAddress,
        headOfficeAddress,
      },
      { new: true }
    );

    if (!updatedCompany) {
      return NextResponse.json(
        {
          message: "Error while updating record!",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Company profile updated!",
        success: true,
        data: updatedCompany,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: error?.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
