import { BOOKING_LICENSE_STATUS } from "@/constants/booking-license";
import verifyJWTToken from "@/helpers/verify-jwt-token";
import BookingLicense from "@/models/booking-license.model";
import Booking from "@/models/booking.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const {
      customerId,
      bookerType,
      customerType,
      primaryGuest,
      masterGuestList,
      bookingSource,
      payType,
      products,
      propertyRef,
    } = await req.json();

    console.log(propertyRef);

    const count = await Booking.countDocuments();
    const newBookingId = count + 1;

    const licensePromises = products.map((product: any) => {
      // console.log(product);
      const bookingLicense = new BookingLicense({
        checkInDate: product.checkInDate,
        checkOutDate: product.checkOutDate,
        price: {
          baseAmount: product?.price?.baseAmount,
          taxAmount: product?.price?.taxAmount,
          discountAmount: product?.price?.discountAmount,
          cancellationAmount: product?.price?.cancellationAmount,
          totalAmount: product?.price?.totalAmount,
          totalAmountAfterDiscount: product?.price?.totalAmountAfterDiscount,
        },
        status: {
          currentStatus: BOOKING_LICENSE_STATUS.NOT_STARTED,
          updatedBy: user?._id,
        },
        product: {
          productType: product?.product?.productType,
          count: 1,
          roomCategoryRef: product?.product?.roomCategoryRef,
        },
        primaryGuest: primaryGuest,
        customer: {
          booker: customerId,
          bookerType: bookerType,
        },
        customerType,
        propertyRef,
        bookingId: newBookingId,
      });

      return bookingLicense
        .save()
        .then((savedLicense: any) => savedLicense._id);
    });

    const licenses = await Promise.all(licensePromises);

    const newBooking = new Booking({
      customer: {
        booker: customerId,
        bookerType: bookerType,
      },
      customerType,
      primaryGuest,
      masterGuestList,
      bookingLicenses: licenses,
      bookingSource,
      payType,
      propertyRef,
      bookingId: newBookingId,
    });

    await newBooking.save();

    return NextResponse.json(
      {
        message: "Booking Created Successfully!",
        success: true,
      },
      { status: 201 }
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
