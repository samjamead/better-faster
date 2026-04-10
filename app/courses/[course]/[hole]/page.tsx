import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { CourseHoleHistory } from "@/components/course-hole/course-hole-history";
import { HolePerformanceSummary } from "@/components/course-hole/hole-performance-summary";
import { exampleTeeData } from "@/data/exampleTeeData";
import { convertSlugToPrettyPrint } from "@/lib/utils";

export default async function CourseHolePage({
  params,
}: {
  params: Promise<{ course: string; hole: string }>;
}) {
  const { course, hole } = await params;
  const holeNumber = Number(hole);

  const prettyCourseName = convertSlugToPrettyPrint(course);

  const holeMetadata = exampleTeeData
    .filter((d) => d.course === prettyCourseName)
    .flatMap((d) =>
      d.holes
        .filter((h) => h.hole === holeNumber)
        .map((h) => ({ tee: d.tee, ...h })),
    );

  return (
    <div className="w-full space-y-6 py-6">
      <p className="text-muted-foreground text-sm">
        <Link
          href={`/courses/${course}/rounds`}
          className="group flex items-center gap-2"
        >
          <ArrowLeft size={12} />{" "}
          <span className="group-hover:underline">Back to rounds</span>
        </Link>
      </p>

      <div className="space-y-2">
        <h2>
          {prettyCourseName}, Hole {holeNumber}
        </h2>
        {holeMetadata.map(({ tee, par, si, yards }) => {
          return (
            <div key={tee} className="text-muted-foreground flex gap-2">
              <p className="w-32">{tee} tee</p>
              <p className="w-20">Par {par}</p>
              <p className="w-28">{yards} yards</p>
              <p className="w-20">SI {si}</p>
            </div>
          );
        })}
      </div>

      <HolePerformanceSummary />
      <CourseHoleHistory />
    </div>
  );
}
