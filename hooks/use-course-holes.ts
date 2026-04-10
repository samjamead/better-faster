"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { convertSlugToPrettyPrint } from "@/lib/utils";

import { useWideHoleData } from "./use-wide-hole-data";

export const useCourseHoles = () => {
  const { course } = useParams<{ course: string }>();

  const { wideHoleData, isLoading, error } = useWideHoleData();

  const prettyName = convertSlugToPrettyPrint(course);

  const data = useMemo(
    () =>
      wideHoleData
        .filter((data) => data.course === prettyName)
        .toSorted((a, b) => {
          const dateComparison = a.date.localeCompare(b.date);
          if (dateComparison !== 0) return dateComparison;
          return a.hole_number - b.hole_number;
        }),
    [wideHoleData, prettyName],
  );

  return { data, isLoading, error };
};
