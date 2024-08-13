"use client";

import React, { useEffect, useState } from "react";
import SinglePropertyCard from "./SinglePropertyCard";
import axiosInstance from "@/utils/axios-instance";

const PropertiesListPage = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get("/api/properties");

      const data = await res.data;

      if (res.status > 300) {
        throw new Error(data);
      }

      const propertiesData = data?.data;

      setProperties(propertiesData);
    } catch (error: any) {
      console.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {properties &&
          properties.map((property: any) => {
            return (
              <SinglePropertyCard key={property?._id} property={property} />
            );
          })}
      </div>
    </div>
  );
};

export default PropertiesListPage;
