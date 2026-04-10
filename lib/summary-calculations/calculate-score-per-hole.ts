import * as d3 from "d3";

import { WideHoleData } from "@/types/wide-hole-data";

export const calculateScorePerHole = (
  data: WideHoleData[],
): {
  par: number;
  averageScore: number;
}[] => {
  const parOptions = [3, 4, 5];

  const perHoleAverages = parOptions.map((par) => {
    const relevantHoles = data.filter((d) => d.par === par);
    const mean = d3.mean(relevantHoles, (d) => d.gross) ?? 0;

    return {
      par,
      averageScore: mean,
    };
  });

  return perHoleAverages;
};
