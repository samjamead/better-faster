"use client";

import { calculateScoreToParSummary } from "@/lib/summary-calculations/calculate-score-to-par";
import { cn } from "@/lib/utils";

import { SummaryLoader } from "./summary-loader";

export const ScoreToPar = () => {
  return (
    <SummaryLoader title="Score to par">
      {(wideHoleData) => {
        const { buckets, maxCount } = calculateScoreToParSummary(wideHoleData);

        return (
          <div className="flex h-full items-end justify-between gap-2">
            {buckets.map((bucket) => {
              const heightPercentage =
                maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;

              return (
                <div
                  key={bucket.key}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <div className="px-2 py-0.5 text-xs font-medium">
                    {buckets.length > 5
                      ? bucket.label!.slice(0, 4)
                      : bucket.label}
                  </div>

                  <div
                    className="flex w-full flex-col items-center justify-end"
                    style={{ height: "120px" }}
                  >
                    <div
                      className={cn(
                        "relative w-full rounded border border-indigo-500/30 bg-indigo-500/30",
                      )}
                      style={{ height: `${heightPercentage}%` }}
                    >
                      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-xs font-medium">
                        {bucket.percentage.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }}
    </SummaryLoader>
  );
};
