"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../sheet";

interface DynamicSheetProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  side?: "top" | "bottom" | "left" | "right";
}

const DynamicSheet = ({
  title,
  children,
  isOpen,
  setIsOpen,
  className,
  side = "right",
}: DynamicSheetProps) => {
  const closeSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeSheet}>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            <div className="mt-4">{children}</div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default DynamicSheet;
