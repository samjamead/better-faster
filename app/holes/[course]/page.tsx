import Link from "next/link";

import { CourseHoles } from "@/components/course-holes";
import { convertSlugToPrettyPrint } from "@/lib/utils";

export default async function CourseHolesPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;

  const prettyCourseName = convertSlugToPrettyPrint(course);

  return (
    <div className="w-full space-y-6 py-6">
      <div className="space-y-2">
        <h2>Course holes for {prettyCourseName}</h2>
        <p className="text-muted-foreground text-sm">
          <Link
            href="/holes"
            className="underline underline-offset-2"
          >
            See all holes played
          </Link>
        </p>
      </div>

      <CourseHoles />
    </div>
  );
}
