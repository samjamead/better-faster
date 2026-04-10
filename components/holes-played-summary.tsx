"use client";

import Link from "next/link";

import { useWideHoleData } from "@/hooks/use-wide-hole-data";
import { convertPrettyPrintToSlug } from "@/lib/utils";

import { Card } from "./ui/card";

export const HolesPlayedSummary = () => {
  const { wideHoleData: data, isLoading, error } = useWideHoleData();

  if (isLoading)
    return (
      <Card heading="Holes Played Summary">
        <p>Loading hole data...</p>
      </Card>
    );

  if (error)
    return (
      <Card heading="Holes Played Summary">
        <p>Error loading hole data: {error.message}</p>
      </Card>
    );

  const courses = [...new Set(data.map((d) => d.course))].sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <div className="space-y-2 text-sm">
      <p>Holes played: {data.length}</p>
      <div className="flex gap-4">
        <p>Filter by course:</p>
        <ul className="flex gap-4">
          {courses.map((course) => (
            <li key={course}>
              <Link
                href={`/holes/${convertPrettyPrintToSlug(course)}`}
                className="decoration-foreground/80 underline underline-offset-2"
              >
                {course}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
