import IndividualProfile from "@/models/individualProfile.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const url = new URL(req.nextUrl);

    const propertyId = url.searchParams.get("propertyId");
    const profileId = url.searchParams.get("profileId");
    const firstName = url.searchParams.get("firstName");
    const lastName = url.searchParams.get("lastName");
    const email = url.searchParams.get("email");
    const phone = url.searchParams.get("phone");

    let query: any = {};
    let andConditions = [];

    if (propertyId) {
      query.propertyRef = propertyId;
    }

    if (profileId) andConditions.push({ _id: profileId });
    if (firstName) andConditions.push({ firstName });
    if (lastName) andConditions.push({ lastName: lastName });
    if (email) andConditions.push({ email: email });
    if (phone) andConditions.push({ phone: phone });

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    const company = await IndividualProfile.findOne(query);

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
