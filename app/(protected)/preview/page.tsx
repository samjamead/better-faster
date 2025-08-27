import { createClient } from "@/lib/supabase/server";
import * as d3 from "d3";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function PreviewPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rounds")
    .select("*")
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (error)
    return (
      <div>
        <p>Error fetching most recent round from database:</p>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="flex max-w-md flex-col gap-8 rounded-md border p-4">
      <div className="grid grid-cols-2 items-baseline gap-4">
        <p className="text-muted-foreground text-sm">
          {new Date(data.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-muted-foreground text-right text-sm">
          Handicap {data.handicap_index}
        </p>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold">{data.course}</h2>
        <h3 className="text-right font-mono text-4xl font-bold">
          {data.gross}{" "}
          <span className="text-muted-foreground text-base">
            {d3.format("+")(data.gross - data.par)}
          </span>
        </h3>
      </div>

      <Table className="border">
        <TableBody>
          <TableRow>
            <TableCell>Fairways</TableCell>
            <TableCell> </TableCell>
            <TableCell className="text-center">
              {Math.round(data.fairways_hit * 100)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Greens in regulation</TableCell>
            <TableCell className="text-center">
              {Math.round(data.greens_in_regulation * data.holes_played)}/
              {data.holes_played}
            </TableCell>
            <TableCell className="text-center">
              {Math.round(data.greens_in_regulation * 100)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Up and down</TableCell>
            <TableCell className="text-center"> </TableCell>
            <TableCell className="text-center">
              {Math.round(data.up_and_down * 100)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Putts</TableCell>
            <TableCell className="text-center"> </TableCell>
            <TableCell className="text-center">{data.putts}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Birdies</TableCell>
            <TableCell className="text-center"> </TableCell>
            <TableCell className="text-center">{data.birdies}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Three putts</TableCell>
            <TableCell className="text-center"> </TableCell>
            <TableCell className="text-center">{data.three_putts}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Penalty shots</TableCell>
            <TableCell className="text-center"> </TableCell>
            <TableCell className="text-center">
              {data.penalty_strokes}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
