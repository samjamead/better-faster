"use client";

import { Heading2 } from "@/components/typography/typography";
import TestsTable from "@/components/tests/tests-table";
import { getWedgeTests } from "@/components/tests/actions";
import LogTestButton from "@/components/tests/log-test-button";

export default function TestsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-16">
        <Heading2>Wedge Tests</Heading2>
        <LogTestButton testType="wedge" />
      </div>
      <TestsTable
        testType="wedge"
        queryKey={["wedge_tests"]}
        queryFn={getWedgeTests}
      />
    </div>
  );
}
