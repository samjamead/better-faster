"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Rounds",
      href: "/rounds",
    },
    {
      label: "Tests",
      href: "/tests",
    },
    {
      label: "Round Builder",
      href: "/round-builder",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            pathname === item.href &&
              "border border-blue-500/30 bg-blue-500/20",
            "rounded-md px-3 py-1 hover:bg-blue-500/20",
          )}
        >
          <p>{item.label}</p>
        </Link>
      ))}
    </div>
  );
}
