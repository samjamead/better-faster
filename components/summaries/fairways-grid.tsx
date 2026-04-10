"use client";

import { calculateFairwaysSummary } from "@/lib/summary-calculations/calculate-fairways-summary";

import { SummaryLoader } from "./summary-loader";

export const FairwaysGrid = () => {
  return (
    <SummaryLoader title="Fairways">
      {(wideHoleData) => {
        const { fairwaysData } = calculateFairwaysSummary(wideHoleData);

        return (
          <div className="grid h-full grid-cols-3 grid-rows-[auto_1fr_auto] gap-2 text-center text-sm">
            <div />
            <div className="text-muted-foreground rounded border py-0.5 text-center text-xs">
              {fairwaysData.get("long")?.percentage.toFixed(0)}%
            </div>
            <div />
            <div className="flex items-center justify-center rounded border border-rose-400/30 bg-rose-400/20 py-3">
              {fairwaysData.get("left")?.percentage.toFixed(0)}%
            </div>
            <div className="flex items-center justify-center rounded border border-emerald-500/30 bg-emerald-500/30 py-3">
              {fairwaysData.get("hit")?.percentage.toFixed(0)}%
            </div>
            <div className="flex items-center justify-center rounded border border-rose-400/30 bg-rose-400/20 py-3">
              {fairwaysData.get("right")?.percentage.toFixed(0)}%
            </div>

            <div />
            <div className="text-muted-foreground rounded border py-0.5 text-center text-xs">
              {fairwaysData.get("short")?.percentage.toFixed(0)}%
            </div>
            <div />
          </div>
        );
      }}
    </SummaryLoader>
  );
};
