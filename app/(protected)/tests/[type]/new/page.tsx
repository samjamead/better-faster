import { Heading2 } from "@/components/typography/typography";

export default async function NewTestPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  return (
    <div className="flex flex-col gap-4">
      <Heading2>New {type} Test</Heading2>
      <p>This is the new test mwahahaha</p>
    </div>
  );
}
