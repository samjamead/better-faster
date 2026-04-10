"use client";

import { useCallback, useMemo } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { convertSlugToPrettyPrint } from "@/lib/utils";

type Filter = {
  key: string;
  value: string;
  label: string;
};

const generateLabel = (key: string, value: string) => {
  const displayValue = convertSlugToPrettyPrint(value);
  if (key == "hole") return `Hole ${displayValue}`;
  if (key == "round") return `Round ${displayValue}`;
  return displayValue;
};

export const useFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const rawParams = searchParams.toString();

  const filters = useMemo<Filter[]>(() => {
    if (!rawParams) {
      return [];
    }

    const params = new URLSearchParams(rawParams);

    return Array.from(params.entries()).reduce<Filter[]>(
      (acc, [key, value]) => {
        const trimmedValue = value.trim();
        if (!trimmedValue.length) {
          return acc;
        }

        acc.push({
          key,
          value: trimmedValue,
          label: generateLabel(key, trimmedValue),
        });
        return acc;
      },
      [],
    );
  }, [rawParams]);

  const removeFilter = useCallback(
    (key: string, value: string) => {
      if (!rawParams) {
        return;
      }

      const params = new URLSearchParams(rawParams);
      const existingValues = params.getAll(key);
      if (!existingValues.length) {
        return;
      }

      let removed = false;
      const remainingValues = existingValues.filter((existingValue) => {
        if (!removed && existingValue === value) {
          removed = true;
          return false;
        }

        return true;
      });

      params.delete(key);
      remainingValues.forEach((remainingValue) => {
        params.append(key, remainingValue);
      });

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, rawParams, router],
  );

  return { filters, removeFilter };
};
