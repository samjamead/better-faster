import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDecimalAsPercentage = (
  value: number | null,
  precision = 1,
) => {
  if (value === null) {
    return null;
  }
  return (value * 100).toFixed(precision) + " %";
};
