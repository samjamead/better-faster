"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { convertSlugToPrettyPrint } from "@/lib/utils";

import { useWideHoleData } from "./use-wide-hole-data";

export const useCourseHole = () => {
  const { course, hole } = useParams<{ course: string; hole: string }>();

  const { wideHoleData, isLoading, error } = useWideHoleData();

  const prettyName = convertSlugToPrettyPrint(course);

  const data = useMemo(
    () =>
      wideHoleData
        .filter(
          (data) =>
            data.course === prettyName && data.hole_number === Number(hole),
        )
        .toSorted((a, b) => {
          const dateComparison = a.date.localeCompare(b.date);
          if (dateComparison !== 0) return dateComparison;
          return a.hole_number - b.hole_number;
        }),
    [wideHoleData, prettyName, hole],
  );

  return { data, isLoading, error };
};
