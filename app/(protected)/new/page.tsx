"use client";

import { useQuery } from "@tanstack/react-query";
import { getRounds } from "@/api/get-rounds";

export default function NewPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rounds"],
    queryFn: getRounds,
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>{data.length} rounds</div>}
    </div>
  );
}
