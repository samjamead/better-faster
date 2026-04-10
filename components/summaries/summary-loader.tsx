"use client";

import { ReactNode } from "react";

import { useWideHoleData } from "@/hooks/use-wide-hole-data";
import { WideHoleData } from "@/types/wide-hole-data";

import { SummaryCard } from "./summaries-card";

type SummaryLoaderProps = {
  title: string;
  children: (wideHoleData: WideHoleData[]) => ReactNode;
};

export const SummaryLoader = ({ title, children }: SummaryLoaderProps) => {
  const { wideHoleData, isLoading, error } = useWideHoleData();

  if (isLoading)
    return (
      <SummaryCard title={title}>
        <p className="text-muted-foreground">loading...</p>
      </SummaryCard>
    );

  if (error)
    return (
      <SummaryCard title={title}>
        <p className="text-muted-foreground">Error: {error.message}</p>
      </SummaryCard>
    );

  if (!wideHoleData || wideHoleData.length === 0) {
    return (
      <SummaryCard title={title}>
        <p className="text-muted-foreground">No data available</p>
      </SummaryCard>
    );
  }

  return <SummaryCard title={title}>{children(wideHoleData)}</SummaryCard>;
};
