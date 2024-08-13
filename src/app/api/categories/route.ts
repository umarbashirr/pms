import Category from "@/models/category.model";
import Property from "@/models/property.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const url = new URL(req.nextUrl);

    const propertyId = url.searchParams.get("propertyId");

    const categories = await Category.find({
      propertyRef: propertyId,
    }).populate({
      path: "propertyRef",
      model: Property,
    });

    return NextResponse.json(
      {
        message: "Categories fetched successfully!",
        success: true,
        data: {
          totalCount: categories.length,
          categories,
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
