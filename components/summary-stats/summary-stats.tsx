import { createClient } from "@/lib/supabase/server";
import { formatDecimalAsPercentage } from "@/lib/utils";
import { Heading2, Heading3 } from "@/components/typography/typography";
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
    "Long game": {
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
    },
    "Short game": {
      "Up and Down": formatDecimalAsPercentage(
        summaryStats?.avg_up_and_down ?? null,
      ),
      "Putts per hole": summaryStats?.avg_putts_per_hole.toFixed(2) ?? null,
    },
    "Per 18 holes": {
      Birdies: summaryStats?.avg_birdies?.toFixed(1) ?? null,
      "Double bogeys": summaryStats?.avg_double_bogeys?.toFixed(1) ?? null,
      "Three putts": summaryStats?.avg_three_putts?.toFixed(1) ?? null,
      "Penalty strokes": summaryStats?.avg_penalty_strokes?.toFixed(1) ?? null,
    },
  } as const;

  type Category = keyof typeof funnelStats;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Heading2>Summary Stats</Heading2>
        <p className="font-medium text-muted-foreground">
          {summaryStats.holes_played} holes played
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {(["Short game", "Per 18 holes", "Long game"] as Category[]).map(
          (category) => (
            <div
              key={category}
              className="space-y-4 rounded-md border bg-background-secondary p-4"
            >
              <Heading3>{category}</Heading3>
              <div className="space-y-4">
                {Object.entries(funnelStats[category]).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between gap-2"
                  >
                    <p className="text-sm font-semibold text-muted-foreground">
                      {key}
                    </p>
                    <p className="font-mono text-lg font-medium">
                      {value ?? "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
