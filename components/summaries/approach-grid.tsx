"use client";

import { calculateApproachSummary } from "@/lib/summary-calculations/calculate-approach-summary";
import { cn } from "@/lib/utils";

import { SummaryLoader } from "./summary-loader";

export const ApproachGrid = () => {
  return (
    <SummaryLoader title="Approach to green">
      {(wideHoleData) => {
        const { approachData } = calculateApproachSummary(wideHoleData);

        return (
          <div className="grid h-full grid-cols-3 gap-2">
            {approachData.map((approach) => (
              <div
                key={approach.key}
                className={cn(
                  "flex flex-col items-center justify-center rounded border py-1",
                  approach.key === "hit" && "bg-emerald-500/30",
                  approach.key !== "hit" &&
                    approach.percentage > 10 &&
                    approach.percentage <= 20 &&
                    "border-rose-400/30 bg-rose-400/20",
                  approach.key !== "hit" &&
                    approach.percentage > 0 &&
                    approach.percentage <= 10 &&
                    "border-rose-400/20 bg-rose-400/10",
                )}
              >
                <div className="text-sm font-medium">
                  {approach.percentage.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        );
      }}
    </SummaryLoader>
  );
};
