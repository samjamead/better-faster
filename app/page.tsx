import { Suspense } from "react";

import { DisplayCoursesIndex } from "@/components/display-courses-index";

export default function ProtectedPage() {
  return (
    <Suspense>
      <div className="flex w-full flex-1 flex-col gap-12 py-12">
        <p className="max-w-sm uppercase">
          Trying to get better at golf by understanding what&apos;s actually
          happening out there
        </p>

        <DisplayCoursesIndex />
      </div>
    </Suspense>
  );
}
