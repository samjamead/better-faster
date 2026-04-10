"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useCourseHoles } from "@/hooks/use-course-holes";
import { useRoundSummaries } from "@/hooks/use-round-summaries";
import { computeHoleGrid } from "@/lib/course-hole-grid";
import { formatToPar } from "@/lib/summary-formatters";
import { cn } from "@/lib/utils";

type DisplayMode = "shapes" | "colour";

const SCORE_COLOURS: Record<string, string> = {
  eaglePlus: "#cfa2f2",
  birdie: "#bcde80",
  bogey: "#97b7f1",
  double: "#97b7f1",
  triple: "#97b7f1",
};

const ScoreIndicator = ({
  score,
  par,
  mode,
}: {
  score: number;
  par: number;
  mode: DisplayMode;
}) => {
  const diff = score - par;
  const base =
    "inline-flex size-6 items-center justify-center tabular-nums leading-none";

  if (mode === "colour") {
    let bg = "";
    let extraClass = "";
    if (diff <= -2) bg = SCORE_COLOURS.eaglePlus;
    else if (diff === -1) bg = SCORE_COLOURS.birdie;
    else if (diff === 1) bg = SCORE_COLOURS.bogey;
    else if (diff === 2) {
      bg = SCORE_COLOURS.double;
      extraClass = "outline outline-offset-1";
    } else if (diff >= 3) {
      bg = SCORE_COLOURS.triple;
      extraClass = "border outline outline-offset-2 border-current";
    }
    return (
      <span
        className={cn(base, extraClass, diff < 0 && "rounded-full")}
        style={bg ? { backgroundColor: bg } : undefined}
      >
        {score}
      </span>
    );
  }

  if (diff <= -2) {
    return (
      <span
        className={`${base} rounded-full border border-current outline-1 outline-offset-1 outline-current`}
      >
        {score}
      </span>
    );
  }
  if (diff === -1) {
    return (
      <span className={`${base} rounded-full border border-current`}>
        {score}
      </span>
    );
  }
  if (diff === 1) {
    return <span className={`${base} border border-current`}>{score}</span>;
  }
  if (diff === 2) {
    return (
      <span
        className={`${base} border border-current outline-1 outline-offset-1 outline-current`}
      >
        {score}
      </span>
    );
  }
  if (diff >= 3) {
    return (
      <span
        className={`${base} border-2 border-current outline-1 outline-offset-1 outline-current`}
      >
        {score}
      </span>
    );
  }
  return <span className={base}>{score}</span>;
};

export const CourseRounds = () => {
  const { course } = useParams<{ course: string }>();
  const { data, isLoading, error } = useCourseHoles();
  const { rounds } = useRoundSummaries();
  const [displayMode, setDisplayMode] = useState<DisplayMode>("shapes");

  const { holeNumbers, holePars, totalPar, roundRows } = useMemo(() => {
    const { holeNumbers, holePars, totalPar } = computeHoleGrid(data);

    const roundMap = new Map<
      number,
      { date: string; holes: Map<number, number | null> }
    >();
    data.forEach((row) => {
      if (!roundMap.has(row.round_id)) {
        roundMap.set(row.round_id, { date: row.date, holes: new Map() });
      }
      roundMap.get(row.round_id)!.holes.set(row.hole_number, row.gross);
    });

    const roundRows = [...roundMap.entries()]
      .map(([roundId, { date, holes }]) => {
        const summary = rounds.find((r) => r.roundId === roundId);
        return {
          roundId,
          date,
          holes,
          gross: summary?.gross ?? null,
          toPar: summary?.toPar ?? null,
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date));

    return { holeNumbers, holePars, totalPar, roundRows };
  }, [data, rounds]);

  if (isLoading) {
    return <p className="text-muted-foreground text-sm">Loading rounds...</p>;
  }

  if (error) {
    return (
      <div className="min-h-32 max-w-sm space-y-2 rounded border p-2 text-sm">
        <p>Error loading rounds:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (roundRows.length === 0) {
    return (
      <div className="min-h-32 max-w-sm space-y-2 rounded border p-2 text-sm">
        <p>No rounds found for this course.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end p-2">
        <button
          onClick={() =>
            setDisplayMode(displayMode === "shapes" ? "colour" : "shapes")
          }
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          {displayMode === "shapes" ? "Switch to colour" : "Switch to shapes"}
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4 text-left font-medium">Date</th>
            {holeNumbers.map((n) => (
              <th key={n} className="w-8 py-2 text-center font-medium">
                <Link
                  href={`/courses/${course}/${n}`}
                  className="hover:underline"
                >
                  {n}
                </Link>
              </th>
            ))}
            <th className="w-12 py-2 text-center font-medium">Total</th>
            <th className="w-12 py-2 text-center font-medium">To Par</th>
          </tr>
          <tr className="border-b">
            <th className="text-muted-foreground py-1 pr-4 text-left font-normal">
              Par
            </th>
            {holeNumbers.map((n) => (
              <th
                key={n}
                className="text-muted-foreground w-8 py-1 text-center font-normal"
              >
                {holePars.get(n) ?? "—"}
              </th>
            ))}
            <th className="text-muted-foreground w-12 py-1 text-center font-normal">
              {totalPar}
            </th>
            <th className="text-muted-foreground w-12 py-1 text-center font-normal" />
          </tr>
        </thead>
        <tbody>
          {roundRows.map(({ roundId, date, holes, gross, toPar }) => (
            <tr key={roundId} className="border-b last:border-0">
              <td className="py-2 pr-4 text-left tabular-nums">{date}</td>
              {holeNumbers.map((n) => {
                const score = holes.get(n);
                const par = holePars.get(n);
                return (
                  <td key={n} className="w-12 py-2 text-center">
                    {score != null && par != null ? (
                      <ScoreIndicator
                        score={score}
                        par={par}
                        mode={displayMode}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                );
              })}
              <td className="w-20 py-2 text-center tabular-nums">
                {gross ?? "—"}
              </td>
              <td className="w-20 py-2 text-center tabular-nums">
                {toPar !== null ? formatToPar(toPar) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
