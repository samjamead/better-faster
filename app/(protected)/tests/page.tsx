"use client";

import { ChevronRight, Plus } from "lucide-react";
import { Heading2 } from "@/components/typography/typography";
import Link from "next/link";
export default function TestsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-16">
        <Heading2>Tests</Heading2>
        <button className="flex items-center gap-2 rounded-md bg-secondary/50 px-2 py-1 text-sm text-foreground/90">
          <Plus className="h-4 w-4" strokeWidth={2} /> <span>Log a test</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Link
          className="group flex items-center justify-between gap-2 rounded-md border border-secondary/20 bg-secondary/10 p-8 transition-colors duration-300 hover:bg-secondary/20"
          href="/tests/wedge"
        >
          <span className="font-semibold">Wedge Tests</span>
          <ChevronRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
            strokeWidth={2}
          />
        </Link>
      </div>
    </div>
  );
}
