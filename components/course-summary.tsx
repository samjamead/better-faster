"use client";

import { useMemo } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { mean } from "d3";

import { useCourseHoles } from "@/hooks/use-course-holes";
import { computeHoleGrid } from "@/lib/course-hole-grid";

const fmt1 = (n: number) => n.toFixed(1);
const fmtPct = (n: number) => `${n}%`;

export const CourseSummary = () => {
  const { course } = useParams<{ course: string }>();
  const { data, isLoading, error } = useCourseHoles();

  const { holeNumbers, holePars, totalPar, holeStats } = useMemo(() => {
    const { holeNumbers, holePars, totalPar } = computeHoleGrid(data);

    type HoleAccum = {
      gross: number[];
      fairways: { made: number; attempts: number };
      gir: { made: number; attempts: number };
      upDown: { made: number; attempts: number };
      putts: number[];
      timesPlayed: number;
    };

    const holeData = new Map<number, HoleAccum>();
    holeNumbers.forEach((n) =>
      holeData.set(n, {
        gross: [],
        fairways: { made: 0, attempts: 0 },
        gir: { made: 0, attempts: 0 },
        upDown: { made: 0, attempts: 0 },
        putts: [],
        timesPlayed: 0,
      }),
    );

    data.forEach((row) => {
      const h = holeData.get(row.hole_number);
      if (!h) return;

      h.timesPlayed += 1;
      if (row.gross != null) h.gross.push(row.gross);
      if (row.hit_fairway !== null) {
        h.fairways.attempts += 1;
        if (row.hit_fairway) h.fairways.made += 1;
      }
      if (row.gir !== null) {
        h.gir.attempts += 1;
        if (row.gir) h.gir.made += 1;
      }
      if (row.up_and_down !== null) {
        h.upDown.attempts += 1;
        if (row.up_and_down) h.upDown.made += 1;
      }
      if (row.putts != null) h.putts.push(row.putts);
    });

    const avg = (arr: number[]) =>
      arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null;
    const pct = (made: number, attempts: number) =>
      attempts ? Math.round((made / attempts) * 100) : null;

    const holeStats = new Map(
      [...holeData.entries()].map(([n, d]) => [
        n,
        {
          avgScore: mean(d.gross),
          fairwayPct: pct(d.fairways.made, d.fairways.attempts),
          girPct: pct(d.gir.made, d.gir.attempts),
          upDownPct: pct(d.upDown.made, d.upDown.attempts),
          avgPutts: avg(d.putts),
          timesPlayed: d.timesPlayed,
        },
      ]),
    );

    // Totals row
    const allFairways = [...holeData.values()].reduce(
      (acc, d) => ({
        made: acc.made + d.fairways.made,
        attempts: acc.attempts + d.fairways.attempts,
      }),
      { made: 0, attempts: 0 },
    );
    const allGir = [...holeData.values()].reduce(
      (acc, d) => ({
        made: acc.made + d.gir.made,
        attempts: acc.attempts + d.gir.attempts,
      }),
      { made: 0, attempts: 0 },
    );
    const allUpDown = [...holeData.values()].reduce(
      (acc, d) => ({
        made: acc.made + d.upDown.made,
        attempts: acc.attempts + d.upDown.attempts,
      }),
      { made: 0, attempts: 0 },
    );
    const perHoleAvgScores = holeNumbers.map((n) => holeStats.get(n)?.avgScore);
    const totalAvgScore = perHoleAvgScores.every((v): v is number => v != null)
      ? perHoleAvgScores.reduce((s, v) => s + v, 0)
      : null;

    const perHoleAvgPutts = holeNumbers.map((n) => holeStats.get(n)?.avgPutts);
    const totalAvgPutts = perHoleAvgPutts.every((v): v is number => v != null)
      ? perHoleAvgPutts.reduce((s, v) => s + v, 0)
      : null;

    holeStats.set(-1, {
      avgScore: totalAvgScore ?? undefined,
      fairwayPct: pct(allFairways.made, allFairways.attempts),
      girPct: pct(allGir.made, allGir.attempts),
      upDownPct: pct(allUpDown.made, allUpDown.attempts),
      avgPutts: totalAvgPutts,
      timesPlayed: 0,
    });

    return { holeNumbers, holePars, totalPar, holeStats };
  }, [data]);

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

  if (holeNumbers.length === 0) {
    return (
      <div className="min-h-32 max-w-sm space-y-2 rounded border p-2 text-sm">
        <p>No rounds found for this course.</p>
      </div>
    );
  }

  const totals = holeStats.get(-1)!;

  type Row = {
    label: string;
    cells: (string | number)[];
    total: string | number | null;
  };

  const rows: Row[] = [
    {
      label: "PAR",
      cells: holeNumbers.map((n) => holePars.get(n) ?? "—"),
      total: totalPar,
    },
    {
      label: "AVG. SCORE",
      cells: holeNumbers.map((n) => {
        const s = holeStats.get(n);
        return s?.avgScore != null ? fmt1(s.avgScore) : "—";
      }),
      total: totals.avgScore != null ? fmt1(totals.avgScore) : "—",
    },
    {
      label: "FAIRWAYS",
      cells: holeNumbers.map((n) => {
        const s = holeStats.get(n);
        return s?.fairwayPct != null ? fmtPct(s.fairwayPct) : "—";
      }),
      total: totals.fairwayPct != null ? fmtPct(totals.fairwayPct) : "—",
    },
    {
      label: "GIR",
      cells: holeNumbers.map((n) => {
        const s = holeStats.get(n);
        return s?.girPct != null ? fmtPct(s.girPct) : "—";
      }),
      total: totals.girPct != null ? fmtPct(totals.girPct) : "—",
    },
    {
      label: "UP AND DOWN",
      cells: holeNumbers.map((n) => {
        const s = holeStats.get(n);
        return s?.upDownPct != null ? fmtPct(s.upDownPct) : "—";
      }),
      total: totals.upDownPct != null ? fmtPct(totals.upDownPct) : "—",
    },
    {
      label: "AVG. PUTTS",
      cells: holeNumbers.map((n) => {
        const s = holeStats.get(n);
        return s?.avgPutts != null ? fmt1(s.avgPutts) : "—";
      }),
      total: totals.avgPutts != null ? fmt1(totals.avgPutts) : "—",
    },
    {
      label: "TIMES PLAYED",
      cells: holeNumbers.map((n) => holeStats.get(n)?.timesPlayed ?? "—"),
      total: null,
    },
  ];

  const holeCellCls = "w-13 p-2 text-center tabular-nums";
  const edgeCellCls = "py-2 px-4 tabular-nums";

  return (
    <div className="w-full overflow-x-auto py-8">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left" />
            {holeNumbers.map((n) => (
              <th key={n} className="w-8 py-2 text-center">
                <Link
                  href={`/courses/${course}/${n}`}
                  className="hover:underline"
                >
                  {n}
                </Link>
              </th>
            ))}
            <th className="px-4 py-2 text-center uppercase">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, cells, total }) => (
            <tr key={label} className="border-b last:border-0">
              <td className={`${edgeCellCls} max-w-28 px-8 text-right`}>
                {label}
              </td>
              {cells.map((cell, i) => (
                <td key={holeNumbers[i]} className={holeCellCls}>
                  {cell}
                </td>
              ))}
              <td className={`${edgeCellCls} px-4 text-center`}>
                {total ?? ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
