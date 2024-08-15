"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PRODUCT_TYPES } from "@/constants/booking-license";
import axiosInstance from "@/utils/axios-instance";
import React, { useEffect, useState } from "react";

const ReservationPage = ({
  params,
}: {
  params: { id: string; bookingId: string };
}) => {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  const fetchBooking = async () => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.get(
        `/api/booking/${params?.bookingId}?propertyId=${params?.id}`
      );
      const data = await res.data;
      setBookingDetails(data?.data);
      toast({
        title: "Success",
        description: "Details Fetched!",
      });
    } catch (error: any) {
      console.error("Error fetching booking:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Oops! Failed to fetch booking details",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalValue = () => {
    let total = 0;

    bookingDetails?.bookingLicenses?.forEach((li: any) => {
      total += li?.price?.totalAmountAfterDiscount;
    });

    setTotalAmount(total);
  };

  const getTotalPayments = () => {
    let total = 0;

    bookingDetails?.payments?.forEach((p: any) => {
      if (!p.isVoid) {
        total += p?.amount;
      }
    });

    setTotalPaid(total);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  useEffect(() => {
    if (bookingDetails) {
      getTotalValue();
      getTotalPayments();
    }
  }, [bookingDetails]);

  if (!bookingDetails) {
    return (
      <div>No booking details available. Please try refreshing the page.</div>
    );
  }

  return (
    <React.Fragment>
      <div>
        <div>
          <table>
            <tr>
              <td className="h-8 font-medium">Booking ID</td>
              <td className="h-8 px-6">{params?.bookingId}</td>
            </tr>
            <tr>
              <td className="h-8 font-medium">Customer Name</td>
              <td className="h-8 px-6">
                {bookingDetails?.customer?.booker?.companyName}
              </td>
            </tr>
            <tr>
              <td className="h-8 font-medium">Customer Email</td>
              <td className="h-8 px-6">
                {bookingDetails?.customer?.booker?.companyEmail}
              </td>
            </tr>
            <tr>
              <td className="h-8 font-medium">Primary Guest</td>
              <td className="h-8 px-6">
                {bookingDetails?.primaryGuest?.firstName +
                  " " +
                  bookingDetails?.primaryGuest?.lastName}
              </td>
            </tr>
            <tr>
              <td className="h-8 font-medium">Booking Source</td>
              <td className="h-8 px-6">{bookingDetails?.bookingSource}</td>
            </tr>
            <tr>
              <td className="h-8 font-medium">Payment Type</td>
              <td className="h-8 px-6">{bookingDetails?.payType}</td>
            </tr>
          </table>
        </div>
        {/* Rooms */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Room Details:</h2>
          <table className="w-full h-full border-collapse border mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="border h-10 text-start px-6">Room Type</th>
                <th className="border h-10 text-start px-6">Assigned Room</th>
                <th className="border h-10 text-start px-6">Count</th>
                <th className="border h-10 text-start px-6">Amount</th>
                <th className="border h-10 text-start px-6">Tax</th>
                <th className="border h-10 text-start px-6">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails?.bookingLicenses?.map((li: any) =>
                li?.product?.productType === PRODUCT_TYPES.ROOM ? (
                  <tr>
                    <td className="border h-10 text-start px-6">
                      {li?.product?.roomCategoryRef?.name}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {!li?.product?.assignedRoom
                        ? "Not Assigned"
                        : li?.product?.assigedRoom?.roomDetails?.code}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.product?.count}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.price?.baseAmount * li?.product?.count}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.price?.taxAmount * li?.product?.count}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.price?.totalAmountAfterDiscount * li?.product?.count}
                    </td>
                  </tr>
                ) : (
                  <tr className="h-20 text-sm text-muted-foreground text-center col-span-6">
                    <td colSpan={6}>No rooms added!</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        {/* Addons */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Addon/Expense Details:</h2>
          <table className="w-full h-full border-collapse border mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="border h-10 text-start px-6">Product Name</th>
                <th className="border h-10 text-start px-6">Count</th>
                <th className="border h-10 text-start px-6">Rate</th>
                <th className="border h-10 text-start px-6">Tax</th>
                <th className="border h-10 text-start px-6">Total Amount</th>
                <th className="border h-10 text-start px-6">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails?.bookingLicenses?.map((li: any) =>
                li?.product?.productType === PRODUCT_TYPES.ADDON ||
                li?.product?.productType === PRODUCT_TYPES.EXPENSE ? (
                  <tr>
                    <td className="border h-10 text-start px-6">
                      {li?.product?.roomCategoryRef?.name}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {!li?.product?.assignedRoom
                        ? "Not Assigned"
                        : li?.product?.assigedRoom?.roomDetails?.code}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.product?.count}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.price?.baseAmount * li?.product?.count}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.price?.taxAmount * li?.product?.count}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {li?.price?.totalAmountAfterDiscount * li?.product?.count}
                    </td>
                  </tr>
                ) : (
                  <tr className="h-20 text-sm text-muted-foreground text-center col-span-6">
                    <td colSpan={6}>Noting posted yet!</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        {/* Payment Details */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Payment Details:</h2>
          <table className="w-full h-full border-collapse border mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="border h-10 text-start px-6">S.No</th>
                <th className="border h-10 text-start px-6">Payment Method</th>
                <th className="border h-10 text-start px-6">Paid Amount</th>
                <th className="border h-10 text-start px-6">Transaction ID</th>
                <th className="border h-10 text-start px-6">Posted By</th>
                <th className="border h-10 text-start px-6">Last Updated At</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails?.payments > 0 ? (
                bookingDetails?.payments?.map((p: any, idx: number) => (
                  <tr key={idx}>
                    <td className="border h-10 text-start px-6">{idx + 1}</td>
                    <td className="border h-10 text-start px-6">
                      {p?.payType}
                    </td>
                    <td className="border h-10 text-start px-6">{p?.amount}</td>
                    <td className="border h-10 text-start px-6">
                      {p?.transactionId}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {p?.updatedBy?.firstName}
                    </td>
                    <td className="border h-10 text-start px-6">
                      {p?.updatedAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-20 text-sm text-muted-foreground text-center col-span-6">
                  <td colSpan={6}>Noting posted yet!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Booking Balance Details */}
        <div className="mt-10">
          <table className="border-collapse border mt-4 mx-auto lg:min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="border h-10 text-center px-6">Total Amount</th>
                <th className="border h-10 text-center px-6">Paid</th>
                <th className="border h-10 text-center px-6">Pending</th>
              </tr>
            </thead>
            <tbody>
              <td className="border h-10 text-center px-6">
                {totalAmount && totalAmount}
              </td>
              <td className="border h-10 text-center px-6">{totalPaid}</td>
              <td className="border h-10 text-center px-6">
                {totalAmount - totalPaid}
              </td>
            </tbody>
          </table>
        </div>
        <div className="my-20 flex items-center justify-center gap-10 lg:max-w-screen-2xl mx-auto flex-wrap">
          <Button>Add Payment</Button>
          <Button>Update Booking Source</Button>
          <Button>View Guest List</Button>
          <Button>Add Addon / Expense</Button>
          <Button>Update Booking Remarks</Button>
          <Button>Edit Booking</Button>
          <Button>Cancel Booking</Button>
          <Button>Email Booking Confirmation</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReservationPage;
