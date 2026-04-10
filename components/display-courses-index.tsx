"use client";

import Link from "next/link";

import { useHolesPlayed } from "@/hooks/use-holes-played";
import { convertPrettyPrintToSlug } from "@/lib/utils";

export const DisplayCoursesIndex = () => {
  const { data, isLoading, error } = useHolesPlayed();

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-8 text-sm">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-1">
            <h2 className="uppercase">Loading course</h2>
            <p className="text-muted-foreground">Counting holes</p>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-32 max-w-sm space-y-2 rounded border p-2 text-sm">
        <p>Error loading courses:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data && !error && !isLoading) {
    return (
      <div className="min-h-32 max-w-sm space-y-2 rounded border p-2 text-sm">
        <p>No courses played!</p>
      </div>
    );
  }

  const coursesMap = data.reduce<Record<string, Set<number>>>((acc, hole) => {
    if (!acc[hole.course]) {
      acc[hole.course] = new Set();
    }
    acc[hole.course].add(hole.round_id);
    return acc;
  }, {});

  const courses = Object.entries(coursesMap)
    .map(([course, roundIds]) => ({
      course,
      slug: convertPrettyPrintToSlug(course),
      rounds: roundIds.size,
    }))
    .sort((a, b) => a.course.localeCompare(b.course));

  return (
    <div className="grid grid-cols-4 gap-8 text-sm">
      {courses.map(({ course, slug, rounds }) => (
        <Link key={slug} href={`/courses/${slug}`}>
          <div className="space-y-1">
            <h2 className="uppercase">{course}</h2>
            <p className="text-muted-foreground">
              {rounds} {rounds === 1 ? "round" : "rounds"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
