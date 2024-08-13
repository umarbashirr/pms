import verifyAdminRights from "@/helpers/verify-admin-rights";
import verifyJWTToken from "@/helpers/verify-jwt-token";
import Category from "@/models/category.model";
import Room from "@/models/room.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { roomNumber, categoryId, propertyId } = await req.json();

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

    const hasRights = verifyAdminRights(user, propertyId);

    if (!hasRights) {
      return NextResponse.json(
        {
          message: "Only admin's are allowed to make changes!",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const room = await Room.findOne({
      roomNumber,
      propertyRef: propertyId,
    });

    if (room) {
      return NextResponse.json(
        {
          message: "Already existed!",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return NextResponse.json(
        {
          message: "Not found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const code = category?.code + " " + roomNumber.trim();

    const newRoom = new Room({
      roomNumber,
      code,
      categoryRef: categoryId,
      propertyRef: propertyId,
    });

    await newRoom.save();

    return NextResponse.json(
      {
        message: "Room created successfully!",
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
