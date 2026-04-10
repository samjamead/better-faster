"use client";

import * as d3 from "d3";

import { Card } from "@/components/ui/card";
import { useCourseHole } from "@/hooks/use-course-hole";

export const HolePerformanceSummary = () => {
  const { data, isLoading, error } = useCourseHole();

  if (isLoading) return <p>Loading hole data...</p>;

  if (error) return <p>Error loading hole data: {error.message}</p>;

  const averageScore = d3.mean(data, (d) => d.gross);

  const girFrequency = data.length
    ? (d3.sum(data, (d) => (d.gir ? 1 : 0)) / data.length) * 100
    : 0;

  return (
    <Card className="max-w-xs text-sm">
      <div className="grid grid-cols-2 gap-2">
        <p>Times played:</p>
        <p>{data.length}</p>
        <p>Average score:</p>
        <p>{averageScore}</p>
        <p>GIR frequency:</p>
        <p>{girFrequency}%</p>
      </div>
    </Card>
  );
};
