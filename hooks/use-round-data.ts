"use client";

import { useMemo } from "react";

import { buildRoundDetails } from "@/lib/build-round-details";
import type {
  HoleSummary,
  RoundSummary,
} from "@/types/round-summary";

import { useWideHoleData } from "./use-wide-hole-data";

export const useRoundData = (roundId: number) => {
  const { wideHoleData, isLoading, error } = useWideHoleData();

  const roundData = useMemo(
    () => wideHoleData.filter((data) => data.round_id === roundId),
    [wideHoleData, roundId],
  );

  const details = useMemo(() => buildRoundDetails(roundData), [roundData]);

  const summary: RoundSummary | null = details?.summary ?? null;
  const holeSummaries: HoleSummary[] = details?.holes ?? [];

  return { roundData, summary, holeSummaries, isLoading, error };
};
