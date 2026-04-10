"use client";

import { calculateScorePerHole } from "@/lib/summary-calculations/calculate-score-per-hole";

import { SummaryLoader } from "./summary-loader";

export const ScorePerHole = () => {
  return (
    <SummaryLoader title="Score by hole par">
      {(wideHoleData) => {
        const averageScores = calculateScorePerHole(wideHoleData);

        return (
          <div className="flex h-full items-end justify-between gap-2 text-center">
            {averageScores.map(({ par, averageScore }) => (
              <div
                key={par}
                className="relative w-full rounded border border-indigo-500/30 bg-indigo-500/30"
                style={{
                  height: `${averageScore ? (averageScore / 6) * 100 : 0}%`,
                }}
              >
                <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
                  {averageScore.toFixed(2)}
                </p>
                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                  Par {par}
                </p>
              </div>
            ))}
          </div>
        );
      }}
    </SummaryLoader>
  );
};
