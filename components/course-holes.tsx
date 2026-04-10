"use client";

import { useCourseHoles } from "@/hooks/use-course-holes";

import { HoleDataTable } from "./tables/hole-data-table";
import { TableErrorState, TableLoadingState } from "./tables/table-states";

export const CourseHoles = () => {
  const { data, isLoading, error } = useCourseHoles();

  if (isLoading) return <TableLoadingState heading="Loading course holes" />;

  if (error)
    return (
      <TableErrorState
        heading="Error loading course holes!"
        message={error.message}
      />
    );

  return <HoleDataTable holeData={data} />;
};
