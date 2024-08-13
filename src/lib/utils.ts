import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameInitials(roomTypeName: string) {
  // Split the name into words
  const words = roomTypeName.split(" ");

  // Get the initials
  let initials = words.map((word) => word[0].toUpperCase()).join("");

  // If the initials are less than 2 characters, pad with 'X'
  while (initials.length < 2) {
    initials += "X";
  }

  // If the initials are more than 3 characters, truncate to 3
  initials = initials.slice(0, 3);

  return initials;
}
