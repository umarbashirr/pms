"use client";

import { Button } from "@/components/ui/button";
import DynamicSheet from "@/components/ui/shared/dynamic-sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Header = ({ propertyId }: { propertyId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const openSidebar = () => {
    setIsOpen(true);
  };

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
      label: "Properties",
      path: `/select-property`,
    },
  ];

  return (
    <>
      <div>
        <Button variant="ghost" size="icon" onClick={openSidebar}>
          <Menu />
        </Button>
      </div>
      <DynamicSheet
        title=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        side="left"
        className="w-72"
      >
        <aside className="h-full -mt-8">
          <div className="flex items-center justify-start h-16">
            <Logo />
          </div>
          <nav className="flex flex-col gap-1 mt-4">
            {routes.map(
              (
                { label, path }: { label: string; path: string },
                idx: number
              ) => {
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
      </DynamicSheet>
    </>
  );
};

export default Header;
