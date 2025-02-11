"use client";

import { useQuery } from "@tanstack/react-query";
import { getRounds } from "./actions";

export default function RoundsTable() {
  const {
    data: rounds,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rounds"],
    queryFn: () => getRounds(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-fit overflow-x-auto rounded-md border p-2">
      <table>
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Date</th>
            <th className="px-2 py-1 text-left">Course</th>
            <th className="px-2 py-1 text-right">Gross</th>
          </tr>
        </thead>
        <tbody>
          {rounds?.map((round) => (
            <tr key={round.id}>
              <td className="px-2 py-1 text-left">{round.round_date}</td>
              <td className="px-2 py-1 text-left">{round.round_course}</td>
              <td className="px-2 py-1 text-right">{round.round_gross}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
