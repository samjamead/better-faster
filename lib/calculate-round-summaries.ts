import {
  PercentageSummary,
  RoundSummary,
} from "@/types/round-summary";
import { WideHoleData } from "@/types/wide-hole-data";

const createPercentage = (
  made: number,
  attempts: number,
): PercentageSummary => ({
  made,
  attempts,
  percent: attempts === 0 ? 0 : Math.round((made / attempts) * 100),
});

const roundAccumulator = () => ({
  gross: 0,
  parTotal: 0,
  completedPar: 0,
  putts: 0,
  stableford: 0,
  fairways: { made: 0, attempts: 0 },
  gir: { made: 0, attempts: 0 },
  upDown: { made: 0, attempts: 0 },
});

export const calculateRoundSummary = (
  roundHoleData: WideHoleData[],
): RoundSummary => {
  if (roundHoleData.length === 0) {
    throw new Error("Cannot calculate round summary without hole data");
  }

  const totals = roundHoleData.reduce((acc, entry) => {
    acc.parTotal += entry.par;

    if (typeof entry.gross === "number") {
      acc.gross += entry.gross;
      acc.completedPar += entry.par;
    }

    if (typeof entry.putts === "number") {
      acc.putts += entry.putts;
    }

    if (typeof entry.stableford === "number") {
      acc.stableford += entry.stableford;
    }

    if (entry.hit_fairway !== null) {
      acc.fairways.attempts += 1;
      if (entry.hit_fairway === true) acc.fairways.made += 1;
    }

    if (entry.gir !== null) {
      acc.gir.attempts += 1;
      if (entry.gir === true) acc.gir.made += 1;
    }

    if (entry.up_and_down !== null) {
      acc.upDown.attempts += 1;
      if (entry.up_and_down === true) acc.upDown.made += 1;
    }

    return acc;
  }, roundAccumulator());

  const firstHole = roundHoleData[0];

  return {
    roundId: firstHole.round_id,
    date: firstHole.date,
    course: firstHole.course,
    tee: firstHole.tee_box,
    holesPlayed: firstHole.holes_played,
    side: firstHole.side_played ?? "",
    handicap: firstHole.playing_handicap,
    gross: totals.gross,
    par: totals.parTotal,
    toPar: totals.completedPar === 0 ? 0 : totals.gross - totals.completedPar,
    stableford: totals.stableford,
    fairways: createPercentage(totals.fairways.made, totals.fairways.attempts),
    gir: createPercentage(totals.gir.made, totals.gir.attempts),
    upDown: createPercentage(totals.upDown.made, totals.upDown.attempts),
    putts: totals.putts,
  };
};

export const calculateRoundSummaries = (
  wideHoleData: WideHoleData[],
): RoundSummary[] => {
  const rounds = wideHoleData.reduce((map, entry) => {
    if (!map.has(entry.round_id)) {
      map.set(entry.round_id, []);
    }
    map.get(entry.round_id)?.push(entry);
    return map;
  }, new Map<number, WideHoleData[]>());

  const summaries = Array.from(rounds.values()).map((roundEntries) =>
    calculateRoundSummary(roundEntries),
  );

  return summaries.sort((a, b) => a.date.localeCompare(b.date));
};
