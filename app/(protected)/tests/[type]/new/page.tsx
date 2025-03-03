import { Heading2 } from "@/components/typography/typography";
import { testsConfig, TestType } from "../../testsConfig";
import InvalidTestType from "@/components/error-states/invalid-test-type";

export default async function NewTestPage({
  params,
}: {
  params: Promise<{ type: TestType }>;
}) {
  const { type } = await params;
  const pageConfig = testsConfig[type];

  if (!pageConfig) {
    return <InvalidTestType type={type} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading2>New {pageConfig.name} Test</Heading2>
      <p className="max-w-prose">
        This is the new test page. We need to figure out what page we&apos;ll
        return the correct instructions. E.g. putting test has ten stations. At
        each station you&apos;ll measure out the putt, putt out, and log the
        following stats:
      </p>
      <ul className="ml-4 list-disc space-y-2 pl-4">
        <li>Putt</li>
        <li>Putt Out</li>
        <li>Putt In</li>
        <li>Putt Out In</li>
        <li>Putt Out In</li>
      </ul>
    </div>
  );
}
