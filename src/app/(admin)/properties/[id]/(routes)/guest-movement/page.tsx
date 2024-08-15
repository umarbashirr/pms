"use client";

import { toast } from "@/components/ui/use-toast";
import { BOOKING_LICENSE_STATUS_TO_STATUS } from "@/constants/booking-license";
import axiosInstance from "@/utils/axios-instance";
import { ExternalLink } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GuestMovementPage = ({ params }: { params: { id: string } }) => {
  const [licenses, setLicenses] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState(moment().format());

  const fetchLicenses = async () => {
    const checkInDate = moment(selectedDate)
      .subtract(1, "days")
      .format("MM/DD/YYYY");
    const checkOutDate = moment(selectedDate).format("MM/DD/YYYY");
    try {
      const res = await axiosInstance.get(
        `/api/licenses?propertyId=${params?.id}&startDate=${checkInDate}&endDate=${checkOutDate}`
      );

      const result = await res.data;

      setLicenses(result?.data?.licenses);
      toast({
        title: "Success",
        description: "Bookings fetched successfully",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Oops! Failed to fetch licenses",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <table className="border border-collapse w-full h-full">
        <thead>
          <tr className="border">
            <th className="border h-10">Booking ID</th>
            <th className="border h-10">Booker Name</th>
            <th className="border h-10">Guest Name</th>
            <th className="border h-10">Check-in Date</th>
            <th className="border h-10">Check-out Date</th>
            <th className="border h-10">Status</th>
            <th className="border h-10">Amount</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license: any) => {
            return (
              <tr key={license?._id}>
                <td className="border text-center h-10">
                  <Link
                    href={`/properties/${params?.id}/reservation/${license?.bookingId}`}
                    className="underline flex items-center gap-2 justify-center"
                  >
                    {license?.bookingId}{" "}
                    <ExternalLink size={12} className="text-primary" />
                  </Link>
                </td>
                <td className="border text-center h-10">
                  {license.customerType === "CompanyProfile"
                    ? license?.customer?.booker?.companyName
                    : `${license?.customer?.booker?.firstName} ${license?.customer?.booker?.lastName}`}
                </td>
                <td className="border text-center h-10">
                  {license?.primaryGuest?.firstName +
                    " " +
                    license?.primaryGuest?.lastName}
                </td>
                <td className="border text-center h-10">
                  {moment(license?.checkInDate).format("MMM Do, YYYY")}
                </td>
                <td className="border text-center h-10">
                  {moment(license?.checkOutDate)
                    .add(1, "days")
                    .format("MMM Do, YYYY")}
                </td>
                <td className="border text-center h-10">
                  {
                    BOOKING_LICENSE_STATUS_TO_STATUS[
                      license?.status?.currentStatus
                    ]
                  }
                </td>
                <td className="border text-center h-10">
                  {license?.price?.totalAmountAfterDiscount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GuestMovementPage;
