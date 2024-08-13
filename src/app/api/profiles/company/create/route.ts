import verifyJWTToken from "@/helpers/verify-jwt-token";
import CompanyProfile from "@/models/companyProfile.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const existingCompany = await CompanyProfile.findOne({
      companyEmail,
      propertyRef,
    });

    if (existingCompany) {
      return NextResponse.json(
        {
          message: "Company profile already existed!",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const company = new CompanyProfile({
      companyName,
      companyCode,
      companyEmail,
      companyPhone,
      gstDetails,
      billingAddress,
      headOfficeAddress,
      propertyRef,
    });

    await company.save();

    return NextResponse.json(
      {
        message: "Company profile created!",
        success: true,
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
