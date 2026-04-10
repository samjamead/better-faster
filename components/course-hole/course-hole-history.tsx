"use client";

import { HoleDataTable } from "@/components/tables/hole-data-table";
import {
  TableErrorState,
  TableLoadingState,
} from "@/components/tables/table-states";
import { useCourseHole } from "@/hooks/use-course-hole";

export const CourseHoleHistory = () => {
  const { data, isLoading, error } = useCourseHole();

  if (isLoading) return <TableLoadingState heading="Loading course holes" />;

  if (error)
    return (
      <TableErrorState
        heading="Error loading course holes!"
        message={error.message}
      />
    );

  return (
    <div className="space-y-2">
      <p>Hole history ({data.length} attempts)</p>
      <HoleDataTable holeData={data} />
    </div>
  );
};
