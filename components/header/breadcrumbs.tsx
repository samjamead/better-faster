"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...pathSegments.map((segment, index) => {
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        name,
        path: `/${pathSegments.slice(0, index + 1).join("/")}`,
      };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-medium text-muted-foreground">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mr-2 h-4 w-4 text-muted-foreground/60" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="max-w-48 truncate text-foreground/90">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="max-w-28 truncate transition-colors duration-200 hover:text-foreground"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
