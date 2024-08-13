import verifyJWTToken from "@/helpers/verify-jwt-token";
import BookingLicense from "@/models/booking-license.model";
import Booking from "@/models/booking.model";
import Category from "@/models/category.model";
import CompanyProfile from "@/models/companyProfile.model";
import IndividualProfile from "@/models/individualProfile.model";
import Property from "@/models/property.model";
import User from "@/models/user.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();

    const url = new URL(req.nextUrl);

    const propertyId = url.searchParams.get("propertyId");

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

    const booking = await Booking.findOne({
      bookingId: params?.id,
      propertyRef: propertyId,
    })
      .populate({
        path: "customer.booker",
        model: CompanyProfile,
      })
      .populate({
        path: "primaryGuest",
        model: IndividualProfile,
      })
      .populate({
        path: "masterGuestList",
        model: IndividualProfile,
      })
      .populate({
        path: "bookingLicenses",
        model: BookingLicense,
      })
      .populate({
        path: "bookingLicenses",
        populate: {
          path: "status.updatedBy",
          model: User,
          select: "name email",
        },
      })
      .populate({
        path: "bookingLicenses",
        populate: {
          path: "product.roomCategoryRef",
          model: Category,
        },
      })
      .populate({
        path: "propertyRef",
        model: Property,
      });
    return NextResponse.json(
      {
        message: "Booking fetched!",
        success: true,
        data: booking,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error?.message);
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
