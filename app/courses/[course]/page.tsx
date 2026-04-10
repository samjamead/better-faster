import { Suspense } from "react";

import Link from "next/link";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { CourseSummary } from "@/components/course-summary";
import { convertSlugToPrettyPrint } from "@/lib/utils";

export default async function CourseSummaryPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const prettyCourseName = convertSlugToPrettyPrint(course);

  return (
    <Suspense>
      <div className="w-full space-y-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            <Link
              href="/courses"
              className="group flex items-center gap-2"
            >
              <ArrowLeft size={12} />{" "}
              <span className="group-hover:underline">
                Back to courses list
              </span>
            </Link>
          </p>
          <p className="text-muted-foreground text-sm">
            <Link
              href={`/courses/${course}/rounds`}
              className="group flex items-center gap-2"
            >
              <span className="group-hover:underline">See rounds</span>{" "}
              <ArrowRight size={12} />
            </Link>
          </p>
        </div>

        <div className="border-muted-foreground border pb-8">
          <div className="border-muted-foreground border-b p-2">
            <h2 className="text-center uppercase">{prettyCourseName}</h2>
          </div>
          <CourseSummary />
        </div>
      </div>
    </Suspense>
  );
}
