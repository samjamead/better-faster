import { createClient } from "@/lib/supabase/server";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { formatDecimalAsPercentage } from "@/lib/utils";
import { Heading2 } from "@/components/typography/typography";
import EmptyState from "./empty-state";

export default async function SummaryStats() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("round_averages").select("*");

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

  if (data.length === 0) {
    return <EmptyState />;
  }

  if (data.length > 1) {
    return (
      <div className="max-w-fit rounded border border-rose-400 bg-rose-200 p-8 dark:border-rose-800/50 dark:bg-rose-300/20">
        <p className="max-w-prose">
          Whoops! More than one entry was returned from the database. This
          should not happen. Please contact the developer.
        </p>
      </div>
    );
  }

  const summaryStats = data[0];

  const funnelStats = {
    "Fairways hit": formatDecimalAsPercentage(
      summaryStats?.avg_fairways_hit ?? null,
    ),
    "Greens in regulation": formatDecimalAsPercentage(
      summaryStats?.avg_greens_in_regulation ?? null,
    ),

    "Greens from fairway": formatDecimalAsPercentage(
      summaryStats?.avg_greens_from_fairway ?? null,
    ),
    "Greens from rough": formatDecimalAsPercentage(
      summaryStats?.avg_greens_from_rough ?? null,
    ),
    "Greens on Par threes": formatDecimalAsPercentage(
      summaryStats?.avg_greens_on_par_three ?? null,
    ),
    "Up and Down": formatDecimalAsPercentage(
      summaryStats?.avg_up_and_down ?? null,
    ),
    "Putts per hole": summaryStats?.avg_putts_per_hole.toFixed(2) ?? null,
    Birdies: summaryStats?.avg_birdies?.toFixed(1) ?? null,
    "Double bogeys": summaryStats?.avg_double_bogeys?.toFixed(1) ?? null,
    "Three putts": summaryStats?.avg_three_putts?.toFixed(1) ?? null,
    "Penalty strokes": summaryStats?.avg_penalty_strokes?.toFixed(1) ?? null,
  };

  return (
    <div className="flex max-w-lg flex-col gap-8">
      <Heading2>Reality Check</Heading2>
      <div className="w-full overflow-x-auto rounded-md border bg-background-secondary">
        <Table>
          <TableBody>
            {Object.entries(funnelStats).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="p-3 pr-8 lg:pr-20">{key}</TableCell>
                <TableCell className="p-3 text-right font-mono text-base font-semibold tracking-wide">
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
