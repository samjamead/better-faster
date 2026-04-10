import { WideHoleData } from "@/types/wide-hole-data";

import { GOOD_PUTTS_THRESHOLD } from "./constants";
import { PuttsSummary } from "./types";
import { toPercentage } from "./utils";

export const calculatePuttsSummary = (data: WideHoleData[]): PuttsSummary => {
  const histogram = new Map<number, number>();

  data.forEach((hole) => {
    if (typeof hole.putts !== "number") return;
    const putts = hole.putts;
    histogram.set(putts, (histogram.get(putts) ?? 0) + 1);
  });

  const totalHoles = Array.from(histogram.values()).reduce(
    (sum, count) => sum + count,
    0,
  );

  const buckets = Array.from(histogram.entries())
    .sort(([a], [b]) => a - b)
    .map(([putts, count]) => ({
      key: putts,
      count,
      percentage: toPercentage(count, totalHoles),
      isGoodPutting: putts <= GOOD_PUTTS_THRESHOLD,
    }));

  const maxCount =
    buckets.length > 0 ? Math.max(...buckets.map((bucket) => bucket.count)) : 0;

  const totalPutts = Array.from(histogram.entries()).reduce(
    (acc, [putts, count]) => acc + putts * count,
    0,
  );

  const averagePutts = totalHoles ? totalPutts / totalHoles : 0;

  return {
    totalHoles,
    maxCount,
    averagePutts,
    buckets,
  };
};
