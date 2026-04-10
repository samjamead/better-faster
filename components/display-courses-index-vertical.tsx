"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useHolesPlayed } from "@/hooks/use-holes-played";
import { cn, convertPrettyPrintToSlug } from "@/lib/utils";

export const DisplayCoursesIndexVertical = () => {
  const { data, isLoading, error } = useHolesPlayed();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex flex-col text-sm">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="text-muted-foreground border-b border-r px-8 py-4"
          >
            <p className="uppercase">Loading course</p>
            <p className="text-xs">Counting holes</p>
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
    <div className="flex flex-col text-sm">
      {courses.map(({ course, slug, rounds }) => {
        const href = `/bf/courses/${slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={slug}
            href={href}
            className={cn(
              "hover:bg-foreground/10 text-muted-foreground border-b border-r px-8 py-4",
              isActive && "text-foreground border-r-transparent",
            )}
          >
            <p className="uppercase">{course}</p>
            <p className="text-xs">
              {rounds} {rounds === 1 ? "round" : "rounds"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
