"use client";

import { Card } from "@/components/ui/card";
import {
  formatAttempts,
  formatPercent,
  formatToPar,
} from "@/lib/summary-formatters";
import type { RoundSummary as RoundSummaryType } from "@/types/round-summary";

type RoundSummaryProps = {
  summary?: RoundSummaryType | null;
};

export const RoundSummary = ({ summary }: RoundSummaryProps) => {
  if (!summary) {
    return (
      <Card heading="Round Summary">
        <div className="bg-emerald-500/10 p-4 text-sm">
          Add hole data to see round stats
        </div>
      </Card>
    );
  }

  return (
    <Card heading="Round Summary">
      <div className="grid grid-cols-3 gap-x-4 gap-y-3 bg-emerald-500/10 p-2 text-sm">
        <p>Gross</p>
        <p className="text-right font-medium">{summary.gross}</p>
        <p className="text-right">{formatToPar(summary.toPar)}</p>

        <p>Stableford</p>
        <p className="text-right font-medium">{summary.stableford}</p>
        <p />

        <p>Fairways</p>
        <p className="text-right">{formatAttempts(summary.fairways)}</p>
        <p className="text-right">{formatPercent(summary.fairways)}</p>

        <p>Greens</p>
        <p className="text-right">{formatAttempts(summary.gir)}</p>
        <p className="text-right">{formatPercent(summary.gir)}</p>

        <p>Up and down</p>
        <p className="text-right">{formatAttempts(summary.upDown)}</p>
        <p className="text-right">{formatPercent(summary.upDown)}</p>

        <p>Putts</p>
        <p className="text-right">{summary.putts}</p>
        <p />
      </div>
    </Card>
  );
};
