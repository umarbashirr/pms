import Category from "@/models/category.model";
import Property from "@/models/property.model";
import Room from "@/models/room.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const url = new URL(req.nextUrl);

    const propertyId = url.searchParams.get("propertyId");

    const rooms = await Room.find({
      propertyRef: propertyId,
    })
      .populate({
        path: "categoryRef",
        model: Category,
      })
      .populate({
        path: "propertyRef",
        model: Property,
      });

    return NextResponse.json(
      {
        message: "Rooms fetched successfully!",
        success: true,
        data: {
          totalCount: rooms.length,
          rooms,
        },
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
