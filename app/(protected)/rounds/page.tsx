"use client";

import { Plus } from "lucide-react";
import RoundsTable from "@/components/rounds/rounds-table";
import { Heading2 } from "@/components/typography/typography";
export default function Rounds() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-16">
        <Heading2>Rounds</Heading2>
        <button className="flex items-center gap-2 rounded-md bg-secondary/50 px-2 py-1 text-sm text-foreground/90">
          <Plus className="h-4 w-4" strokeWidth={2} /> <span>Add a round</span>
        </button>
      </div>
      <RoundsTable />
    </div>
  );
}
