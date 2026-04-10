"use client";

import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getWideHoleData } from "@/api/get-wide-hole-data";
import { WideHoleData } from "@/types/wide-hole-data";

const defaultWideHoleData: WideHoleData[] = [];

const getTrimmedParams = (params: URLSearchParams, key: string) =>
  params
    .getAll(key)
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

const getNumberSet = (params: URLSearchParams, key: string) => {
  const parsed = getTrimmedParams(params, key)
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isFinite(value));

  return parsed.length ? new Set(parsed) : null;
};

const getStringSet = (params: URLSearchParams, key: string) => {
  const values = getTrimmedParams(params, key);
  return values.length ? new Set(values) : null;
};

export const useWideHoleData = () => {
  const searchParams = useSearchParams();
  const yearFilters = useMemo(
    () => getNumberSet(searchParams, "year"),
    [searchParams],
  );
  const roundIdFilters = useMemo(
    () => getNumberSet(searchParams, "round"),
    [searchParams],
  );
  const courseSlugFilters = useMemo(
    () => getStringSet(searchParams, "course"),
    [searchParams],
  );
  const holeNumberFilters = useMemo(
    () => getNumberSet(searchParams, "hole"),
    [searchParams],
  );

  const {
    data: wideHoleData = defaultWideHoleData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wide_hole_data"],
    queryFn: () => getWideHoleData(),
    select: (data = defaultWideHoleData) =>
      [...data].sort((a, b) => {
        const dateDiff =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateDiff !== 0) {
          return dateDiff;
        }

        return a.hole_number - b.hole_number;
      }),
  });

  const filteredWideHoleData = useMemo(() => {
    if (!wideHoleData.length) {
      return wideHoleData;
    }

    return wideHoleData.filter((hole) => {
      if (yearFilters) {
        const holeYear = new Date(hole.date).getFullYear();
        if (!Number.isFinite(holeYear) || !yearFilters.has(holeYear)) {
          return false;
        }
      }

      if (roundIdFilters && !roundIdFilters.has(hole.round_id)) {
        return false;
      }

      if (courseSlugFilters && !courseSlugFilters.has(hole.course_slug)) {
        return false;
      }

      if (holeNumberFilters && !holeNumberFilters.has(hole.hole_number)) {
        return false;
      }

      return true;
    });
  }, [
    courseSlugFilters,
    wideHoleData,
    yearFilters,
    roundIdFilters,
    holeNumberFilters,
  ]);

  return {
    wideHoleData: filteredWideHoleData,
    isLoading,
    error,
  };
};
