import { WideHoleData } from "@/types/wide-hole-data";

import { CHIPPING_CLUB_ORDER } from "./constants";
import { ChippingSummary } from "./types";
import { toPercentage } from "./utils";

export const calculateChippingSummary = (
  data: WideHoleData[],
): ChippingSummary => {
  const clubStats = new Map<string, { attempts: number; successes: number }>();

  data.forEach((hole) => {
    const club = hole.chipping_club;
    if (!club) return;

    const clubKey = String(club);
    const stats = clubStats.get(clubKey) ?? { attempts: 0, successes: 0 };

    stats.attempts++;
    if (hole.up_and_down === true) {
      stats.successes++;
    }

    clubStats.set(clubKey, stats);
  });

  const clubs = CHIPPING_CLUB_ORDER.map((club) => {
    const stats = clubStats.get(club) ?? { attempts: 0, successes: 0 };
    return {
      club,
      attempts: stats.attempts,
      successes: stats.successes,
      percentage: toPercentage(stats.successes, stats.attempts),
    };
  });

  const totalAttempts = clubs.reduce((acc, club) => acc + club.attempts, 0);
  const totalSuccesses = clubs.reduce((acc, club) => acc + club.successes, 0);

  return {
    clubs,
    totalAttempts,
    totalSuccesses,
    overallPercentage: toPercentage(totalSuccesses, totalAttempts),
  };
};
