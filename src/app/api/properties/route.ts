import { ACCESS_COOKIE_NAME } from "@/constants/cookie";
import verifyJWTToken from "@/helpers/verify-jwt-token";
import Property from "@/models/property.model";
import User from "@/models/user.model";
import connectMongo from "@/utils/connect-mongo";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const decodedUser = await verifyJWTToken(req);

    if (!decodedUser.success) {
      return NextResponse.json(
        {
          message: decodedUser?.message,
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const user: any = decodedUser?.data;

    const userProperties = await User.findById(user?._id)
      .populate({
        path: "properties.property",
        model: Property,
      })
      .select("properties");

    if (!userProperties) {
      cookies().delete(ACCESS_COOKIE_NAME);

      return NextResponse.json(
        {
          message: "No such user found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const properties = userProperties.properties.map((d: any) => d?.property);

    return NextResponse.json(
      {
        message: "Properties fetched successfully",
        data: properties,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
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
