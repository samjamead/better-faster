import { createClient } from "@/lib/supabase/server";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { formatDecimalAsPercentage } from "@/lib/utils";

export default async function RealityCheck() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("round_averages")
    .select("*")
    .single();

  if (error) {
    return (
      <div className="max-w-fit rounded border border-rose-400 bg-rose-200 p-8 dark:border-rose-800/50 dark:bg-rose-300/20">
        <p className="max-w-prose">
          Error fetching data when trying to display summary statistics. The
          error returned from the database is: {error.message}
        </p>
      </div>
    );
  }

  const funnelStats = {
    "Fairways hit": formatDecimalAsPercentage(data?.avg_fairways_hit ?? null),
    "Greens in regulation": formatDecimalAsPercentage(
      data?.avg_greens_in_regulation ?? null,
    ),

    "Greens from fairway": formatDecimalAsPercentage(
      data?.avg_greens_from_fairway ?? null,
    ),
    "Greens from rough": formatDecimalAsPercentage(
      data?.avg_greens_from_rough ?? null,
    ),
    "Greens on Par threes": formatDecimalAsPercentage(
      data?.avg_greens_on_par_three ?? null,
    ),
    "Up and Down": formatDecimalAsPercentage(data?.avg_up_and_down ?? null),
    "Putts per hole": data?.avg_putts_per_hole.toFixed(2) ?? null,
    Birdies: data?.avg_birdies?.toFixed(1) ?? null,
    "Double bogeys": data?.avg_double_bogeys?.toFixed(1) ?? null,
    "Three putts": data?.avg_three_putts?.toFixed(1) ?? null,
    "Penalty strokes": data?.avg_penalty_strokes?.toFixed(1) ?? null,
  };

  return (
    <div className="flex items-start gap-8">
      <div className="max-w-fit overflow-x-auto rounded-md border bg-background-secondary">
        <Table>
          <TableBody>
            {Object.entries(funnelStats).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="p-3 pr-8 font-mono lg:pr-20">
                  {key}
                </TableCell>
                <TableCell className="p-3 text-right font-mono">
                  {value ?? "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
