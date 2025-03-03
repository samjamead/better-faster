"use client";

import { ChevronRight } from "lucide-react";
import { Heading2 } from "@/components/typography/typography";
import Link from "next/link";
import LogTestButton from "@/components/tests/log-test-button";

export default function TestsPage() {
  const test_types = [
    {
      name: "Wedge",
      href: "/tests/wedge",
    },
    {
      name: "Putting",
      href: "/tests/putting",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-16">
        <Heading2>Tests</Heading2>
        <LogTestButton />
      </div>
      <div className="grid grid-cols-1 gap-8">
        {test_types.map((type) => (
          <Link
            className="group flex items-center justify-between gap-2 rounded-md border border-secondary/20 bg-secondary/10 p-8 transition-colors duration-300 hover:bg-secondary/20 md:max-w-md"
            href={type.href}
            key={type.name}
          >
            <span className="font-semibold">{type.name} Tests</span>
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
