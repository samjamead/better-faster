"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Rounds",
      href: "/rounds",
    },
    {
      label: "Tests",
      href: "/tests",
    },
    {
      label: "Drills",
      href: "/drills",
    },
    {
      label: "Round Builder",
      href: "/round-builder",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-1 font-mono font-medium tracking-wide">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "-ml-4 w-[calc(100%+16px)] rounded-md px-4 py-1 hover:bg-primary/25",
            (item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)) &&
              "bg-primary/50 hover:bg-primary/50",
          )}
        >
          <p>{item.label}</p>
        </Link>
      ))}
    </div>
  );
}
