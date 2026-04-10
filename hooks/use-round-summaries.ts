"use client";

import { useMemo } from "react";

import { useWideHoleData } from "@/hooks/use-wide-hole-data";
import { calculateRoundSummaries } from "@/lib/calculate-round-summaries";

export const useRoundSummaries = () => {
  const { wideHoleData, isLoading, error } = useWideHoleData();

  const rounds = useMemo(
    () => calculateRoundSummaries(wideHoleData),
    [wideHoleData],
  );

  return { rounds, isLoading, error };
};
