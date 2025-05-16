"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import { getGolferSummary } from "./server-actions";
import {
  HeaderSummaryStatMessage,
  GolferSummaryProps,
} from "./header-summary-stat-message";

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
        <HeaderSummaryStatMessage data={displaySummary} />
      )}
    </div>
  );
}
