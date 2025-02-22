"use client";

import { Plus } from "lucide-react";
import { Heading2 } from "@/components/typography/typography";
import TestsTable from "@/components/tests/tests-table";
export default function TestsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-16">
        <Heading2>Wedge Tests</Heading2>
        <button className="flex items-center gap-2 rounded-md bg-secondary/50 px-2 py-1 text-sm text-foreground/90">
          <Plus className="h-4 w-4" strokeWidth={2} /> <span>Log a test</span>
        </button>
      </div>
      <TestsTable />
    </div>
  );
}
