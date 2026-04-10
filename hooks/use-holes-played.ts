"use client";

import { useQuery } from "@tanstack/react-query";

import { getHolesPlayed } from "@/api/get-holes-played";
import { HolePlayed } from "@/types/hole-played";

const defaultWideHoleData: HolePlayed[] = [];

export const useHolesPlayed = () => {
  const {
    data = defaultWideHoleData,
    isLoading,
    error,
  } = useQuery<HolePlayed[], Error>({
    queryKey: ["holes-played"],
    queryFn: () => getHolesPlayed(),
  });

  return { data, isLoading, error };
};
