import verifyAdminRights from "@/helpers/verify-admin-rights";
import verifyJWTToken from "@/helpers/verify-jwt-token";
import { getNameInitials } from "@/lib/utils";
import Category from "@/models/category.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { name, price, propertyId } = await req.json();

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

    const category = await Category.findOne({
      name: name.toLowerCase(),
      propertyRef: propertyId,
    });

    if (category) {
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

    const code = getNameInitials(name);

    const newCategory = new Category({
      name,
      code,
      price,
      propertyRef: propertyId,
    });

    await newCategory.save();

    return NextResponse.json(
      {
        message: "Category created successfully!",
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
