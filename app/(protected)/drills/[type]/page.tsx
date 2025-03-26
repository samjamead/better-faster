import { Heading2 } from "@/components/typography/typography";
import AddEntryButton from "@/components/ui/add-entry-button";
import { capPrettySlug, prettySlug } from "@/lib/utils";

export default async function DrillTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  const prettyType = prettySlug(type);
  const capPrettyType = capPrettySlug(type);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Heading2>{capPrettyType} Drills</Heading2>
        <AddEntryButton href={`/drills/${type}/new`}>
          Add a drill
        </AddEntryButton>
      </div>
      <div className="rounded-md bg-card p-8">
        Todo: Add list of completed{" "}
        <span className="border-b border-b-secondary/50 bg-secondary/20 px-1 py-0.5">
          {prettyType}
        </span>{" "}
        drills
      </div>
    </div>
  );
}
