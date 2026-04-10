import Link from "next/link";

import { cn } from "@/lib/utils";

export const NavItem = ({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "hover:bg-foreground/10 text-muted-foreground flex h-10 items-center border-r border-b px-8 text-sm tracking-wider",
        isActive && "text-foreground border-b-transparent",
      )}
    >
      {label}
    </Link>
  );
};
