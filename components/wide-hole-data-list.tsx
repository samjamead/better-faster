"use client";

import { useWideHoleData } from "@/hooks/use-wide-hole-data";

import { HoleDataTable } from "./tables/hole-data-table";

export const WideHoleDataList = () => {
  const { wideHoleData, isLoading, error } = useWideHoleData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <HoleDataTable holeData={wideHoleData} />;
};
