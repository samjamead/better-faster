import { WideHoleData } from "@/types/wide-hole-data";

export interface DrivingAccuracy {
  club: string | number;
  count: number;
  hitFairwayPercentage: number;
  missLeftPercentage: number;
  missRightPercentage: number;
  missLongPercentage: number;
  missShortPercentage: number;
}

export const calculateDrivingAccuracy = (
  data: WideHoleData[],
): DrivingAccuracy[] => {
  const clubStats = new Map<
    string | number,
    {
      count: number;
      hits: number;
      left: number;
      right: number;
      long: number;
      short: number;
    }
  >();

  data.forEach((hole) => {
    if (hole.tee_club === null || hole.hit_fairway === null) return;

    if (!clubStats.has(hole.tee_club)) {
      clubStats.set(hole.tee_club, {
        count: 0,
        hits: 0,
        left: 0,
        right: 0,
        long: 0,
        short: 0,
      });
    }

    const stats = clubStats.get(hole.tee_club)!;
    stats.count++;

    if (hole.hit_fairway) {
      stats.hits++;
    } else if (hole.fairway_miss) {
      const miss = hole.fairway_miss.toLowerCase();
      if (miss === "left") stats.left++;
      else if (miss === "right") stats.right++;
      else if (miss === "long") stats.long++;
      else if (miss === "short") stats.short++;
    }
  });

  const result = Array.from(clubStats.entries()).map(([club, stats]) => {
    return {
      club,
      count: stats.count,
      hitFairwayPercentage:
        stats.count > 0 ? (stats.hits / stats.count) * 100 : 0,
      missLeftPercentage:
        stats.count > 0 ? (stats.left / stats.count) * 100 : 0,
      missRightPercentage:
        stats.count > 0 ? (stats.right / stats.count) * 100 : 0,
      missLongPercentage:
        stats.count > 0 ? (stats.long / stats.count) * 100 : 0,
      missShortPercentage:
        stats.count > 0 ? (stats.short / stats.count) * 100 : 0,
    };
  });

  return result.sort((a, b) => b.count - a.count);
};
