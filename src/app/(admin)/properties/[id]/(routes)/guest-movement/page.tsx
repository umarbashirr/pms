"use client";

// import { toast } from "@/components/ui/use-toast";
// import { BOOKING_LICENSE_STATUS_TO_STATUS } from "@/constants/booking-license";
// import axiosInstance from "@/utils/axios-instance";
// import { ExternalLink } from "lucide-react";
// import moment from "moment";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const GuestMovementPage = ({ params }: { params: { id: string } }) => {
//   const [licenses, setLicenses] = useState([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [selectedDate, setSelectedDate] = useState(moment().format());

//   const fetchLicenses = async () => {
//     const checkInDate = moment(selectedDate)
//       .subtract(1, "days")
//       .format("MM/DD/YYYY");
//     const checkOutDate = moment(selectedDate).format("MM/DD/YYYY");
//     try {
//       const res = await axiosInstance.get(
//         `/api/licenses?propertyId=${params?.id}&startDate=${checkInDate}&endDate=${checkOutDate}`
//       );

//       const result = await res.data;

//       setLicenses(result?.data?.licenses);
//       toast({
//         title: "Success",
//         description: "Bookings fetched successfully",
//       });
//     } catch (error: any) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Oops! Failed to fetch licenses",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLicenses();
//   }, []);

//   if (isLoading) {
//     return (
//       <div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <table className="border border-collapse w-full h-full">
//         <thead>
//           <tr className="border">
//             <th className="border h-10">Booking ID</th>
//             <th className="border h-10">Booker Name</th>
//             <th className="border h-10">Guest Name</th>
//             <th className="border h-10">Check-in Date</th>
//             <th className="border h-10">Check-out Date</th>
//             <th className="border h-10">Status</th>
//             <th className="border h-10">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {licenses.map((license: any) => {
//             return (
//               <tr key={license?._id}>
//                 <td className="border text-center h-10">
//                   <Link
//                     href={`/properties/${params?.id}/reservation/${license?.bookingId}`}
//                     className="underline flex items-center gap-2 justify-center"
//                   >
//                     {license?.bookingId}{" "}
//                     <ExternalLink size={12} className="text-primary" />
//                   </Link>
//                 </td>
//                 <td className="border text-center h-10">
//                   {license.customerType === "CompanyProfile"
//                     ? license?.customer?.booker?.companyName
//                     : `${license?.customer?.booker?.firstName} ${license?.customer?.booker?.lastName}`}
//                 </td>
//                 <td className="border text-center h-10">
//                   {license?.primaryGuest?.firstName +
//                     " " +
//                     license?.primaryGuest?.lastName}
//                 </td>
//                 <td className="border text-center h-10">
//                   {moment(license?.checkInDate).format("MMM Do, YYYY")}
//                 </td>
//                 <td className="border text-center h-10">
//                   {moment(license?.checkOutDate)
//                     .add(1, "days")
//                     .format("MMM Do, YYYY")}
//                 </td>
//                 <td className="border text-center h-10">
//                   {
//                     BOOKING_LICENSE_STATUS_TO_STATUS[
//                       license?.status?.currentStatus
//                     ]
//                   }
//                 </td>
//                 <td className="border text-center h-10">
//                   {license?.price?.totalAmountAfterDiscount}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GuestMovementPage;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Grid, LayoutGrid, List, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookingCardTwo from "./components/booking-card-two";
import BookingCardThree from "./components/booking-card-three";
import BookingCardFour from "./components/booking-card-four";
import BookingCardFive from "./components/booking-card-five";

// In a real application, this data would come from an API
const bookingsData = [
  {
    id: 1,
    bookerName: "John Doe",
    primaryGuestName: "John Doe",
    roomNumber: 101,
    roomType: "Deluxe",
    checkIn: "2023-06-20",
    checkOut: "2023-06-25",
    status: "Confirmed",
    payType: "Credit Card",
    totalAmount: 500,
    pax: 2,
  },
  {
    id: 2,
    bookerName: "Jane Smith",
    primaryGuestName: "Robert Smith",
    roomNumber: 202,
    roomType: "Suite",
    checkIn: "2023-06-22",
    checkOut: "2023-06-24",
    status: "Checked In",
    payType: "Cash",
    totalAmount: 300,
    pax: 1,
  },
  {
    id: 3,
    bookerName: "Bob Johnson",
    primaryGuestName: "Alice Johnson",
    roomNumber: 305,
    roomType: "Standard",
    checkIn: "2023-06-25",
    checkOut: "2023-06-30",
    status: "Pending",
    payType: "Debit Card",
    totalAmount: 750,
    pax: 3,
  },
  {
    id: 4,
    bookerName: "Alice Brown",
    primaryGuestName: "Charlie Brown",
    roomNumber: 401,
    roomType: "Deluxe",
    checkIn: "2023-06-28",
    checkOut: "2023-07-02",
    status: "Confirmed",
    payType: "Credit Card",
    totalAmount: 600,
    pax: 2,
  },
  {
    id: 5,
    bookerName: "Charlie Wilson",
    primaryGuestName: "Diana Wilson",
    roomNumber: 103,
    roomType: "Suite",
    checkIn: "2023-07-01",
    checkOut: "2023-07-05",
    status: "Pending",
    payType: "Cash",
    totalAmount: 550,
    pax: 4,
  },
];

export default function Bookings() {
  const [bookings, setBookings] = useState(bookingsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("checkIn");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [layout, setLayout] = useState("multi");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStatus = (value: string) => {
    setFilterStatus(value);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const filteredBookings = bookings
    .filter(
      (booking) =>
        booking.bookerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.primaryGuestName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.roomNumber.toString().includes(searchTerm)
    )
    .filter(
      (booking) => filterStatus === "All" || booking.status === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "checkIn")
        return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
      if (sortBy === "bookerName")
        return a.bookerName.localeCompare(b.bookerName);
      if (sortBy === "totalAmount") return a.totalAmount - b.totalAmount;
      return 0;
    });

  const bookingStatuses = [
    "All",
    "Confirmed",
    "Checked In",
    "Pending",
    "Cancelled",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant={layout === "multi" ? "default" : "outline"}
            size="icon"
            onClick={() => setLayout("multi")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setLayout("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Select onValueChange={handleFilterStatus} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {bookingStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSort} defaultValue="checkIn">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checkIn">Check-in Date</SelectItem>
              <SelectItem value="bookerName">Booker Name</SelectItem>
              <SelectItem value="totalAmount">Total Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {layout === "table" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booker Name</TableHead>
                <TableHead>Primary Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.bookerName}</TableCell>
                  <TableCell>{booking.primaryGuestName}</TableCell>
                  <TableCell>
                    {booking.roomNumber} - {booking.roomType}
                  </TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "Confirmed"
                          ? "default"
                          : booking.status === "Checked In"
                          ? "outline"
                          : booking.status === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${booking.totalAmount}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            layout === "multi"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredBookings.map((booking) => (
            <BookingCardTwo key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
