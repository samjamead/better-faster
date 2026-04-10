"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { NavItem } from "./nav-item";

export const BetterFasterNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const navItems = [
    { href: "/better-faster", label: "INDEX" },
    { href: "/stats", label: "STATS" },
    { href: "/courses", label: "COURSES" },
    { href: "/holes", label: "HOLE DATA" },
    { href: "/rounds", label: "ROUND DATA" },
    { href: "/rounds/add-round", label: "ADD ROUND" },
    { href: "/rationale", label: "RATIONALE" },
  ];

  return (
    <ul className="flex items-center">
      {navItems.map((item) => (
        <li key={item.href}>
          <NavItem
            href={queryString ? `${item.href}?${queryString}` : item.href}
            label={item.label}
            isActive={pathname === item.href}
          />
        </li>
      ))}
    </ul>
  );
};
