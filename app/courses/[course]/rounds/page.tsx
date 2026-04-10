import { Suspense } from "react";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { CourseRounds } from "@/components/course-rounds";
import { convertSlugToPrettyPrint } from "@/lib/utils";

export default async function CourseRoundsPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const prettyCourseName = convertSlugToPrettyPrint(course);

  return (
    <Suspense>
      <div className="w-full space-y-4 py-4">
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm">
            <Link
              href={`/courses/${course}`}
              className="group flex items-center gap-2"
            >
              <ArrowLeft size={12} />{" "}
              <span className="group-hover:underline">
                Back to course summary
              </span>
            </Link>
          </p>
        </div>

        <div className="border-muted-foreground border pb-8">
          <div className="border-muted-foreground border-b p-2">
            <h2 className="text-center uppercase">{prettyCourseName}</h2>
          </div>
          <CourseRounds />
        </div>
      </div>
    </Suspense>
  );
}
