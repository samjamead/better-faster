import { Heading2 } from "@/components/typography/typography";
import CoursesTable from "@/components/courses/courses-table";

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-8">
      <Heading2>Courses</Heading2>
      <CoursesTable />
    </div>
  );
}
