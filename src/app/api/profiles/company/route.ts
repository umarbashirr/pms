import CompanyProfile from "@/models/companyProfile.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const url = new URL(req.nextUrl);

    const propertyId = url.searchParams.get("propertyId");
    const companyProfileId = url.searchParams.get("companyProfileId");
    const companyCode = url.searchParams.get("companyCode");
    const companyEmail = url.searchParams.get("companyEmail");
    const companyPhone = url.searchParams.get("companyPhone");

    let query: any = {};
    let andConditions = [];

    if (propertyId) {
      query.propertyRef = propertyId;
    }

    if (companyProfileId) andConditions.push({ _id: companyProfileId });
    if (companyCode) andConditions.push({ companyCode: companyCode });
    if (companyEmail) andConditions.push({ companyEmail: companyEmail });
    if (companyPhone) andConditions.push({ companyPhone: companyPhone });

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    const company = await CompanyProfile.findOne(query);

    return NextResponse.json(
      {
        message: "Profile fetched successfully!",
        success: true,
        data: company,
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
