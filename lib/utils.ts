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

export const prettySlug = (slug: string) => slug.replace(/-/g, " ");

export const capPrettySlug = (slug: string) =>
  prettySlug(slug).replace(/\b\w/g, (char) => char.toUpperCase());
