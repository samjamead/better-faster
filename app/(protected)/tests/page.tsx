"use client";

import { ChevronRight, Plus } from "lucide-react";
import { Heading2 } from "@/components/typography/typography";
import Link from "next/link";
import { testsConfig } from "./testsConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TestsPage() {
  const testTypes = Object.values(testsConfig);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-16">
        <Heading2>Tests</Heading2>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2 text-sm text-foreground/90">
            <Plus className="h-5 w-5" /> Log a Test
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {testTypes.map((test) => (
              <DropdownMenuItem key={test.name}>
                <Link href={`${test.href}/new`}>{test.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {testTypes.map((test) => (
          <Link
            className="group flex items-center justify-between gap-2 rounded-md border border-secondary/20 bg-secondary/10 p-8 transition-colors duration-300 hover:bg-secondary/20 md:max-w-md"
            href={test.href}
            key={test.name}
          >
            <span className="font-semibold">{test.name} Tests</span>
            <ChevronRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
              strokeWidth={2}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
