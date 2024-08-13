import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@/models/user.model";
import { loginFormSchema } from "@/schemas/login-form.schema";
import connectMongo from "@/utils/connect-mongo";
import { ACCESS_COOKIE_NAME } from "@/constants/cookie";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectMongo();
    const data = await req.json();
    const { email, password } = loginFormSchema.parse(data);

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Invalid Password",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const payload = {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      properties: user?.properties,
    };

    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    cookies().set(ACCESS_COOKIE_NAME, token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      {
        message: "Logged In successfully",
        success: true,
      },
      {
        status: 201,
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
