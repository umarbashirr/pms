import { NextRequest, NextResponse } from "next/server";

import { ACCESS_COOKIE_NAME } from "@/constants/cookie";
import connectMongo from "@/utils/connect-mongo";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectMongo();

    cookies().delete(ACCESS_COOKIE_NAME);

    return NextResponse.json(
      {
        message: "Logged out successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
      },
      { status: 500 }
    );
  }
}
