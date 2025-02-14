"use client";

import { Plus } from "lucide-react";
import RoundsTable from "@/components/rounds/rounds-table";
export default function Rounds() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Rounds</h2>
        <button className="flex items-center gap-2 rounded-md bg-blue-500 px-3 py-2 text-sm text-foreground/90">
          <Plus className="h-4 w-4" strokeWidth={2} /> <span>Add Round</span>
        </button>
      </div>
      <RoundsTable />
    </div>
  );
}
