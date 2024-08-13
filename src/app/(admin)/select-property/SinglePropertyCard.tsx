"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface SinglePropertyCardProps {
  _id: string;
  name: string;
  city: string;
  state: string;
  isActive: boolean;
}

const SinglePropertyCard = ({ property }: any) => {
  const router = useRouter();

  const selectProperty = () => {
    router.push(`/properties/${property?._id}`);
  };

  return (
    <div
      className="border p-6 rounded-lg shadow-sm cursor-pointer"
      onClick={selectProperty}
    >
      <h2>{property?.name}</h2>
    </div>
  );
};

export default SinglePropertyCard;
