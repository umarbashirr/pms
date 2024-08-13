import verifyJWTToken from "@/helpers/verify-jwt-token";
import IndividualProfile from "@/models/individualProfile.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updatedIndividualProfile = await IndividualProfile.findOneAndUpdate(
      {
        _id: params?.id,
        propertyRef,
      },
      {
        firstName,
        lastName,
        email,
        phone,
        dob,
        address,
        verificationIdDetails,
      },
      { new: true }
    );

    if (!updatedIndividualProfile) {
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
        message: "Profile updated!",
        success: true,
        data: updatedIndividualProfile,
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
