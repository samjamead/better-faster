import LogTestButton from "@/components/tests/log-test-button";
import TestsTable from "@/components/tests/tests-table";
import { Heading2 } from "@/components/typography/typography";
import { testsConfig, TestType } from "../testsConfig";
import InvalidTestType from "@/components/error-states/invalid-test-type";
export default async function TestsPage({
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
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-16">
        <Heading2>{pageConfig.name} Tests</Heading2>
        <LogTestButton type={type} />
      </div>
      <TestsTable
        testType={type}
        queryKey={pageConfig.queryKey}
        queryFn={pageConfig.queryFn}
      />
    </div>
  );
}
