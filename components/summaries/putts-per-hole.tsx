"use client";

import { calculatePuttsSummary } from "@/lib/summary-calculations/calculate-putts-summary";
import { cn } from "@/lib/utils";

import { SummaryLoader } from "./summary-loader";

export const PuttsPerHole = () => {
  return (
    <SummaryLoader title="Putts per hole">
      {(wideHoleData) => {
        const { buckets, maxCount } = calculatePuttsSummary(wideHoleData);

        return (
          <div className="flex h-full items-center justify-between gap-2">
            {buckets.map((bucket) => {
              const heightPercentage =
                maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;

              return (
                <div
                  key={bucket.key}
                  className="flex h-full flex-1 flex-col items-center gap-1"
                >
                  <div className="px-2 py-0.5 text-xs font-medium">
                    {bucket.key} putt
                  </div>

                  <div className="flex h-full w-full flex-col items-center justify-end">
                    <div
                      className={cn(
                        "relative h-full w-full rounded border",
                        bucket.isGoodPutting
                          ? "border-emerald-500/30 bg-emerald-500/30"
                          : "border-rose-400/30 bg-rose-400/30",
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
