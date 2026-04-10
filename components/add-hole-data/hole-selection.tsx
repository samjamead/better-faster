"use client";

import { formatToPar } from "@/lib/summary-formatters";
import { cn } from "@/lib/utils";
import type {
  HoleSummary,
  RoundSummary,
} from "@/types/round-summary";

type HoleSelectionProps = {
  selectedHole: number;
  onSelect: (hole: number) => void;
  holes: HoleSummary[];
  summary?: RoundSummary | null;
};

export const HoleSelection = ({
  selectedHole,
  onSelect,
  holes,
  summary,
}: HoleSelectionProps) => {
  const holeMap = new Map(holes.map((hole) => [hole.holeNumber, hole]));
  const holeNumbers =
    holes.length > 0
      ? [...holeMap.keys()].sort((a, b) => a - b)
      : Array.from({ length: summary?.holesPlayed ?? 18 }, (_, i) => i + 1);

  return (
    <div className="flex rounded border text-sm">
      <div className="flex flex-col gap-2 border-r px-3 py-2">
        <span>Hole</span>
        <span>Par</span>
        <span>Gross</span>
        <span className="whitespace-nowrap">To par</span>
      </div>
      {holeNumbers.map((holeNumber) => {
        const hole = holeMap.get(holeNumber);
        const grossDisplay =
          hole && typeof hole.gross === "number" ? hole.gross : "—";
        const parDisplay = hole ? hole.par : "—";
        const toParDisplay =
          hole && hole.cumulativeToPar !== null
            ? formatToPar(hole.cumulativeToPar)
            : "—";

        return (
          <button
            key={holeNumber}
            className={cn(
              "text-muted-foreground flex w-12 flex-col items-center justify-center gap-2 border-r px-1 text-center text-xs font-medium hover:cursor-pointer md:w-10 md:text-sm",
              selectedHole === holeNumber && "bg-indigo-600/30 text-white",
            )}
            type="button"
            onClick={() => onSelect(holeNumber)}
          >
            <span>{holeNumber}</span>
            <span>{parDisplay}</span>
            <span>{grossDisplay}</span>
            <span>{toParDisplay}</span>
          </button>
        );
      })}
      <div className="flex flex-col gap-2 px-4 py-2 text-center">
        <span>Total</span>
        <span>{summary?.par ?? "—"}</span>
        <span>{summary?.gross ?? "—"}</span>
        <span>{summary ? formatToPar(summary.toPar) : "—"}</span>
      </div>
    </div>
  );
};
