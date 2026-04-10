import { WideHoleData } from "@/types/wide-hole-data";

import { SCORE_TO_PAR_LABELS } from "./constants";
import { ScoreToParSummary } from "./types";
import { toPercentage } from "./utils";

export const calculateScoreToParSummary = (
  data: WideHoleData[],
): ScoreToParSummary => {
  const histogram = new Map<number, number>();

  data.forEach((hole) => {
    if (typeof hole.gross !== "number") return;
    const scoreToPar = hole.gross - hole.par;
    histogram.set(scoreToPar, (histogram.get(scoreToPar) ?? 0) + 1);
  });

  const totalHoles = Array.from(histogram.values()).reduce(
    (sum, count) => sum + count,
    0,
  );

  const buckets = Array.from(histogram.entries())
    .sort(([a], [b]) => a - b)
    .map(([score, count]) => ({
      key: score,
      label: SCORE_TO_PAR_LABELS[score],
      count,
      percentage: toPercentage(count, totalHoles),
    }));

  const maxCount =
    buckets.length > 0 ? Math.max(...buckets.map((bucket) => bucket.count)) : 0;

  return {
    totalHoles,
    maxCount,
    buckets,
  };
};
