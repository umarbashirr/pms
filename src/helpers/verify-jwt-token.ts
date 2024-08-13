import { ACCESS_COOKIE_NAME } from "@/constants/cookie";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const verifyJWTToken = async (req: NextRequest) => {
  try {
    const token = await req.cookies.get(ACCESS_COOKIE_NAME)?.value;

    if (!token) {
      return { success: false, message: "Access denied!" };
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    );

    if (!decodedToken) {
      return { success: false, message: "Invalid Access Token" };
    }

    return { success: true, message: "Token Verified", data: decodedToken };
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

export default verifyJWTToken;
