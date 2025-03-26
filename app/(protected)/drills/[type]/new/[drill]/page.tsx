import { Heading2 } from "@/components/typography/typography";
import { capPrettySlug } from "@/lib/utils";

export default async function NewDrillPage({
  params,
}: {
  params: Promise<{ type: string; drill: string }>;
}) {
  const { type, drill } = await params;

  return (
    <div className="space-y-6">
      <Heading2>
        New {capPrettySlug(type)} Drill: {capPrettySlug(drill)}
      </Heading2>
      <p>Finally you will actually log your drill</p>
    </div>
  );
}
