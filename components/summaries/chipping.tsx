"use client";

import { calculateChippingSummary } from "@/lib/summary-calculations/calculate-chipping-summary";
import { cn } from "@/lib/utils";

import { SummaryLoader } from "./summary-loader";

export const Chipping = () => {
  return (
    <SummaryLoader title="Chipping">
      {(wideHoleData) => {
        const { clubs } = calculateChippingSummary(wideHoleData);
        const maxAttempts = Math.max(...clubs.map((club) => club.attempts), 1);

        return (
          <div>
            <div className="mb-1 grid grid-cols-[1fr_40px_1fr] text-center text-xs">
              <p>Attempts</p>
              <p> </p>
              <p>Up and down</p>
            </div>
            {clubs.map((data) => {
              const frequencyWidth =
                maxAttempts > 0 ? (data.attempts / maxAttempts) * 100 : 0;

              return (
                <div
                  key={data.club}
                  className="group grid grid-cols-[1fr_auto_1fr] items-center"
                >
                  <div className="flex h-8 flex-col items-end justify-center">
                    <div
                      className="bg-muted-foreground/10 relative border"
                      style={{ width: `${frequencyWidth}%`, height: "80%" }}
                    >
                      <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs font-bold">
                        {data.attempts}
                      </span>
                    </div>
                  </div>

                  <div className="w-10 text-center text-xs font-bold">
                    {data.club}
                  </div>

                  <div className="flex h-8 flex-col items-start justify-center">
                    <div
                      className={cn(
                        "relative flex items-center",
                        data.percentage > 40
                          ? "border-emerald-500/30 bg-emerald-500/30"
                          : "border-rose-400/30 bg-rose-400/30",
                      )}
                      style={{ width: `${data.percentage}%`, height: "80%" }}
                    >
                      <span className="ml-2 text-xs font-bold whitespace-nowrap">
                        {data.attempts > 0
                          ? `${data.percentage.toFixed(0)}%`
                          : "-"}
                      </span>
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
