import verifyJWTToken from "@/helpers/verify-jwt-token";
import IndividualProfile from "@/models/individualProfile.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      address,
      verificationIdDetails,
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

    const existingProfile = await IndividualProfile.findOne({
      email,
      propertyRef,
    });

    if (existingProfile) {
      return NextResponse.json(
        {
          message: "Profile already existed!",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const individualProfile = new IndividualProfile({
      firstName,
      lastName,
      email,
      phone,
      dob,
      address,
      verificationIdDetails,
      propertyRef,
    });

    await individualProfile.save();

    return NextResponse.json(
      {
        message: "Profile created!",
        success: true,
        data: individualProfile,
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
