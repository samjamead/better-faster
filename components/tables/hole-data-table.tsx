import Link from "next/link";

import { Check, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMissValue } from "@/lib/summary-formatters";
import { convertPrettyPrintToSlug } from "@/lib/utils";
import { WideHoleData } from "@/types/wide-hole-data";

export const HoleDataTable = ({ holeData }: { holeData: WideHoleData[] }) => {
  return (
    <Table borders="vertical" className="w-full border-t border-b text-sm">
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Course</TableHead>
          <TableHead className="text-center">Hole</TableHead>
          <TableHead className="text-center">Par</TableHead>
          <TableHead className="text-center">Yards</TableHead>
          <TableHead className="text-center">SI</TableHead>
          <TableHead className="bg-foreground/5 text-center">Gross</TableHead>
          <TableHead className="text-center">Tee club</TableHead>
          <TableHead className="text-center">Fairway</TableHead>
          <TableHead className="text-center">Approach club</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
          <TableHead className="text-center">Chipping club</TableHead>
          <TableHead className="text-center">Putts</TableHead>
          <TableHead className="text-center">Up and down</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holeData.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="text-center">{entry.date}</TableCell>
            <TableCell className="text-center">
              <Link
                href={`/holes/${convertPrettyPrintToSlug(entry.course)}`}
                className="hover:cursor-pointer"
              >
                {entry.course}
              </Link>
            </TableCell>
            <TableCell className="text-center">
              <Link
                href={`/courses/${convertPrettyPrintToSlug(entry.course)}/${entry.hole_number}`}
                className="hover:cursor-pointer"
              >
                {entry.hole_number}
              </Link>
            </TableCell>
            <TableCell className="text-center">{entry.par}</TableCell>
            <TableCell className="text-center">{entry.yards}</TableCell>
            <TableCell className="text-center">{entry.stroke_index}</TableCell>
            <TableCell className="bg-foreground/5 text-center">
              {entry.gross}
            </TableCell>
            <TableCell className="text-center">{entry.tee_club}</TableCell>
            <TableCell className="text-center">
              {entry.hit_fairway == true ? (
                <Check width={16} height={16} className="mx-auto" />
              ) : (
                entry.fairway_miss
              )}
            </TableCell>
            <TableCell className="text-center">{entry.approach_club}</TableCell>
            <TableCell className="text-center">
              {entry.approach_outcome == "hit" ? (
                <Check width={16} height={16} className="mx-auto" />
              ) : entry.approach_outcome == null ? (
                <X width={16} height={16} className="mx-auto" />
              ) : (
                formatMissValue(entry.approach_outcome)
              )}
            </TableCell>
            <TableCell className="text-center">{entry.chipping_club}</TableCell>
            <TableCell className="text-center">{entry.putts}</TableCell>
            <TableCell className="text-center">
              {entry.up_and_down === true ? (
                <Check width={16} height={16} className="mx-auto" />
              ) : entry.up_and_down === false ? (
                <X width={16} height={16} className="mx-auto" />
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
