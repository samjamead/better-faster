import { WideHoleData } from "@/types/wide-hole-data";

export const calculateFairwaysSummary = (data: WideHoleData[]) => {
  const fairways = data.reduce(
    (acc, hole) => {
      if (hole.hit_fairway == true) acc.hit++;
      if (
        hole.hit_fairway === false &&
        hole.fairway_miss &&
        hole.fairway_miss in acc
      ) {
        acc[hole.fairway_miss as keyof typeof acc]++;
      }
      if (hole.hit_fairway !== null) acc.total++;
      return acc;
    },
    {
      long: 0,
      left: 0,
      hit: 0,
      right: 0,
      short: 0,
      total: 0,
    },
  );

  const fairwaysData = new Map(
    Object.entries(fairways)
      .filter(([key]) => key !== "total")
      .map(([key, value]) => [
        key,
        {
          key,
          value,
          percentage: (value / fairways.total) * 100,
        },
      ]),
  );

  return { fairwaysData };
};
