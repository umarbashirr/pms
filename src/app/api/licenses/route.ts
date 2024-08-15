import BookingLicense from "@/models/booking-license.model";
import Category from "@/models/category.model";
import Property from "@/models/property.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import CompanyProfile from "@/models/companyProfile.model";
import IndividualProfile from "@/models/individualProfile.model";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const url = new URL(req.nextUrl);

    const propertyId = url.searchParams.get("propertyId");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    const checkInDate = moment(startDate, "MM/DD/YYYY").startOf("day").format();
    const checkOutDate = moment(endDate, "MM/DD/YYYY").startOf("day").format();

    console.log(checkInDate, checkOutDate);

    const licenses = await BookingLicense.find({
      propertyRef: propertyId,
      $or: [
        {
          $and: [
            { checkInDate: { $lte: checkOutDate } },
            { checkOutDate: { $gte: checkInDate } },
          ],
        },
        {
          $and: [
            { checkInDate: { $gte: checkInDate } },
            { checkInDate: { $lte: checkOutDate } },
          ],
        },
        {
          $and: [
            { checkOutDate: { $gte: checkInDate } },
            { checkOutDate: { $lte: checkOutDate } },
          ],
        },
      ],
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
        path: "product.roomCategoryRef",
        model: Category,
      })
      .populate({
        path: "propertyRef",
        model: Property,
      });

    return NextResponse.json(
      {
        message: "licenses fetched successfully!",
        success: true,
        data: {
          totalCount: licenses.length,
          licenses,
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
