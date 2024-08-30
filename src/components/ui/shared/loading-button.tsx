"use client";

import React, { ReactNode } from "react";
import { Button } from "../button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  className?: string;
  isLoading?: boolean;
  onClick?: any;
  loadingText: string;
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const LoadingButton = ({
  className,
  isLoading,
  onClick,
  loadingText,
  children,
  type = "button",
  variant = "default",
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      className={cn(
        "w-full flex items-center justify-center text-center gap-2",
        className
      )}
      disabled={isLoading}
      onClick={onClick}
      variant={variant}
    >
      {isLoading && (
        <ReloadIcon className="animate-spin repeat-infinite duration-500" />
      )}
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
