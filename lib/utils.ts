import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertSlugToPrettyPrint = (slug: string) => {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toLocaleUpperCase() + w.slice(1))
    .join(" ");
};

export const convertPrettyPrintToSlug = (pretty: string) => {
  return pretty
    .split(" ")
    .map((w) => w.toLowerCase())
    .join("-");
};
