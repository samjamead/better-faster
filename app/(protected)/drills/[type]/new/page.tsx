import { Heading2 } from "@/components/typography/typography";
import { capPrettySlug } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function NewDrillPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  const capPrettyType = capPrettySlug(type);

  const availableDrills = [
    {
      type: "wedge",
      name: "Scoring Spiral",
      slug: "scoring-spiral",
    },
  ];

  return (
    <div className="space-y-6">
      <Heading2>New {capPrettyType} Drill</Heading2>

      <ul>
        {availableDrills
          .filter((drill) => drill.type === type)
          .map((drill) => (
            <li key={drill.name}>
              <Link
                href={`/drills/${type}/new/${drill.slug}`}
                className="group flex w-80 items-center justify-between rounded border bg-secondary/20 p-3"
              >
                {drill.name}
                <ChevronRight className="h-4 w-4 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
