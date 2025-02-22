"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import { getGolferSummary } from "./server-actions";

type GolferSummaryProps = {
  data: { name: string; handicap: number; holes_per_birdie: number } | null;
};

export const GolferSummary = ({ data }: GolferSummaryProps) => {
  if (!data) return null;

  return (
    <p>
      {data.name} ({data.handicap}) makes birdie every {data.holes_per_birdie}{" "}
      holes
    </p>
  );
};

export default function LoggedInHeader() {
  const pathname = usePathname();
  const [displaySummary, setDisplaySummary] =
    useState<GolferSummaryProps["data"]>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getGolferSummary();
      setDisplaySummary(data);
    };
    fetchSummary();
  }, []);

  const pathDepth = pathname.slice(1).split("/").filter(Boolean).length;

  return (
    <div>
      {pathDepth > 1 ? (
        <Breadcrumbs />
      ) : (
        <GolferSummary data={displaySummary} />
      )}
    </div>
  );
}
