import {
  approachHitGreen,
  hasLoggedApproachOutcome,
} from "@/lib/approach-outcome";
import { CLUBS_IN_ORDER } from "@/lib/summary-calculations/constants";
import { WideHoleData } from "@/types/wide-hole-data";

export interface ApproachAccuracy {
  club: string;
  count: number;
  hitApproachPercentage: number;
}

export const calculateApproachAccuracy = (
  data: WideHoleData[],
): ApproachAccuracy[] => {
  const clubStats = new Map<
    string,
    {
      count: number;
      hits: number;
    }
  >();

  data.forEach((hole) => {
    if (hole.approach_club === null || !hasLoggedApproachOutcome(hole)) return;

    const club = String(hole.approach_club);

    if (!clubStats.has(club)) {
      clubStats.set(club, {
        count: 0,
        hits: 0,
      });
    }

    const stats = clubStats.get(club)!;
    stats.count++;

    if (approachHitGreen(hole)) {
      stats.hits++;
    }
  });

  return CLUBS_IN_ORDER.map((club) => {
    const stats = clubStats.get(club);

    if (!stats) return null;
    return {
      club,
      count: stats.count,
      hitApproachPercentage:
        stats.count > 0 ? (stats.hits / stats.count) * 100 : 0,
    };
  }).filter((item): item is ApproachAccuracy => item !== null);
};
