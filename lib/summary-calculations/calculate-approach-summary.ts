import {
  getApproachOutcome,
  hasLoggedApproachOutcome,
} from "@/lib/approach-outcome";
import { WideHoleData } from "@/types/wide-hole-data";

export const calculateApproachSummary = (data: WideHoleData[]) => {
  const approaches = data
    .filter(hasLoggedApproachOutcome)
    .reduce(
      (acc, hole) => {
        const outcome = getApproachOutcome(hole);

        if (outcome && outcome in acc) {
          acc[outcome as keyof typeof acc]++;
        }

        acc.total++;
        return acc;
      },
      {
        ll: 0,
        long: 0,
        lr: 0,
        left: 0,
        hit: 0,
        right: 0,
        sl: 0,
        short: 0,
        sr: 0,
        total: 0,
      },
    );

  const approachData = Object.entries(approaches)
    .filter(([key]) => key !== "total")
    .map(([key, value]) => ({
      key,
      value,
      percentage: (value / approaches.total) * 100,
    }));

  return { approachData };
};
