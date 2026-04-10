"use client";

import { Card } from "@/components/ui/card";
import { useWideHoleData } from "@/hooks/use-wide-hole-data";

import { SummaryCard } from "./summaries-card";

export const OverallStats = () => {
  const { wideHoleData, isLoading, error } = useWideHoleData();

  if (isLoading)
    return (
      <Card>
        <div>
          <p>Loading...</p>
        </div>
      </Card>
    );

  if (error)
    return (
      <Card>
        <div>
          <p>Error loading data: {error.message}</p>
        </div>
      </Card>
    );

  const uniqueRounds = [...new Set(wideHoleData.map((d) => d.round_id))];
  const uniqueCourses = [...new Set(wideHoleData.map((d) => d.course))];

  return (
    <SummaryCard title="">
      <div className="space-y-2">
        <dl className="grid grid-cols-2">
          <dt className="uppercase">Holes played</dt>
          <dd>{String(wideHoleData.length).padStart(3, "0")}</dd>
        </dl>
        <dl className="grid grid-cols-2">
          <dt className="uppercase">Rounds played</dt>
          <dd>{String(uniqueRounds.length).padStart(3, "0")}</dd>
        </dl>
        <dl className="grid grid-cols-2">
          <dt className="uppercase">Courses played</dt>
          <dd>{String(uniqueCourses.length).padStart(3, "0")}</dd>
        </dl>
      </div>
    </SummaryCard>
  );
};
