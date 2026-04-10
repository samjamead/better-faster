"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoundSummaries } from "@/hooks/use-round-summaries";
import {
  formatAttempts,
  formatToPar,
} from "@/lib/summary-formatters";
import { convertPrettyPrintToSlug } from "@/lib/utils";

export const RoundsList = () => {
  const { rounds, isLoading, error } = useRoundSummaries();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <p>Rounds played: {rounds.length}</p>
      <Table borders="vertical" className="w-full border-t border-b text-sm">
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Course</TableHead>
            <TableHead className="text-center">Tee</TableHead>
            <TableHead className="text-center">Holes</TableHead>
            <TableHead className="text-center">Side</TableHead>
            <TableHead className="text-center">Handicap</TableHead>
            <TableHead className="text-center">Gross</TableHead>
            <TableHead className="text-center">To Par</TableHead>
            <TableHead className="text-center">Fairways</TableHead>
            <TableHead className="text-center">GIR</TableHead>
            <TableHead className="text-center">Up & Down</TableHead>
            <TableHead className="text-center">Putts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rounds.map((round) => (
            <TableRow key={round.roundId}>
              <TableCell className="text-center">
                <Link href={`/rounds/${round.roundId}`}>
                  {String(round.roundId).padStart(3, "0")}
                </Link>
              </TableCell>
              <TableCell className="text-center">{round.date}</TableCell>
              <TableCell className="text-center">
                <Link
                  href={`/holes/${convertPrettyPrintToSlug(round.course)}`}
                >
                  {round.course}
                </Link>
              </TableCell>
              <TableCell className="text-center">{round.tee}</TableCell>
              <TableCell className="text-center">{round.holesPlayed}</TableCell>
              <TableCell className="text-center">{round.side}</TableCell>
              <TableCell className="text-center">{round.handicap}</TableCell>
              <TableCell className="text-center">{round.gross}</TableCell>
              <TableCell className="text-center">
                {formatToPar(round.toPar)}
              </TableCell>
              <TableCell className="text-center">
                {formatAttempts(round.fairways)}
              </TableCell>
              <TableCell className="text-center">
                {formatAttempts(round.gir)}
              </TableCell>
              <TableCell className="text-center">
                {formatAttempts(round.upDown)}
              </TableCell>
              <TableCell className="text-center">{round.putts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
