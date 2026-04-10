import { Suspense } from "react";

import { DisplayCoursesIndex } from "@/components/display-courses-index";

export default function CoursesPage() {
  return (
    <Suspense>
      <div className="flex w-full flex-1 flex-col gap-12 py-12">
        <p className="max-w-sm uppercase">Rounds by course</p>
        <DisplayCoursesIndex />
      </div>
    </Suspense>
  );
}
