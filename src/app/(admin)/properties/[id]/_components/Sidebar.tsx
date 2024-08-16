"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarProps {
  propertyId: string;
}

const Sidebar = ({ propertyId }: SidebarProps) => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      path: `/properties/${propertyId}/dashboard`,
    },
    {
      label: "Create Reservation",
      path: `/properties/${propertyId}/create-reservation`,
    },
    {
      label: "Rooms",
      path: `/properties/${propertyId}/rooms`,
    },
    {
      label: "Guest Movement",
      path: `/properties/${propertyId}/guest-movement`,
    },
    {
      label: "Guest List",
      path: `/properties/${propertyId}/guest-list`,
    },
    {
      label: "Create Individual",
      path: `/properties/${propertyId}/profiles/create-individual`,
    },
    {
      label: "Create Company",
      path: `/properties/${propertyId}/profiles/create-company`,
    },
    {
      label: "Properties",
      path: `/select-property`,
    },
  ];

  return (
    <aside className="border-r h-full">
      <div className="flex items-center justify-start border-b h-16 px-4">
        <Logo />
      </div>
      <nav className="flex flex-col px-2 gap-1 mt-4">
        {routes.map(
          ({ label, path }: { label: string; path: string }, idx: number) => {
            return (
              <Link
                key={idx}
                href={path}
                className={cn(
                  "flex items-center justify-start gap-2 p-2 rounded",
                  pathname === path
                    ? "bg-primary text-primary-foreground"
                    : "text-primary bg-transparent"
                )}
              >
                {label}
              </Link>
            );
          }
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
