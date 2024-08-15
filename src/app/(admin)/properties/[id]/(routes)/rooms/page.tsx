"use client";

import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/utils/axios-instance";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RoomsPage = ({ params }: { params: { id: string } }) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchRooms = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/rooms?propertyId=${params?.id}`
      );
      const data = await res.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      setRooms(data?.data?.rooms);

      toast({
        title: "Success",
        description: data?.message,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch rooms",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room: any) => (
          <Link
            href=""
            className="w-full h-full rounded-lg shadow-sm border p-6 min-h-60 bg-primary"
          >
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
              {/* <p>{room?.categoryRef?.name}</p> */}
              <p className="text-white">{room?.code}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RoomsPage;
