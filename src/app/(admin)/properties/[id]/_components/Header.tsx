"use client";

import { Button } from "@/components/ui/button";
import DynamicSheet from "@/components/ui/shared/dynamic-sheet";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axiosInstance from "@/utils/axios-instance";
import toast from "react-hot-toast";
import LoadingButton from "@/components/ui/shared/loading-button";

const Header = ({ propertyId }: { propertyId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const openSidebar = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

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

  async function logoutHandler(e: any) {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      const res = await axiosInstance.post("/api/auth/logout");

      const data = await res.data;

      if (!data?.success) {
        throw new Error(data);
      }

      router.replace("/auth/login");
    } catch (error: any) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 w-full">
        <Button variant="ghost" size="icon" onClick={openSidebar}>
          <Menu />
        </Button>
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline">Write your feedback</Button>
          <LoadingButton
            loadingText="Please wait..."
            isLoading={isLoggingOut}
            variant="destructive"
            onClick={(e: any) => logoutHandler(e)}
          >
            Logout
          </LoadingButton>
        </div>
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
