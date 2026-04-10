import { calculateRoundSummary } from "@/lib/calculate-round-summaries";
import type { RoundDetails } from "@/types/round-summary";
import type { WideHoleData } from "@/types/wide-hole-data";

export const buildRoundDetails = (
  roundData: WideHoleData[],
): RoundDetails | null => {
  if (roundData.length === 0) return null;

  const summary = calculateRoundSummary(roundData);

  let runningToPar = 0;
  const holes = [...roundData]
    .sort((a, b) => a.hole_number - b.hole_number)
    .map((hole) => {
      const toPar = hole.gross === null ? null : hole.gross - hole.par;
      const cumulativeToPar = toPar === null ? null : (runningToPar += toPar);

      return {
        id: hole.id,
        holeNumber: hole.hole_number,
        par: hole.par,
        yards: hole.yards,
        strokeIndex: hole.stroke_index,
        shotsGiven: hole.shots_given,
        gross: hole.gross,
        putts: hole.putts,
        toPar,
        cumulativeToPar,
        net: hole.net,
        stableford: hole.stableford,
      };
    });

  return { summary, holes };
};
