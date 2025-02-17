import { createClient } from "@/lib/supabase/server";

type GolferStats = {
  [key: string]: number | string;
};

export default async function SummaryCards() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("golfer_stats").select("*");

  if (error) {
    return <div>Error fetching rounds</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border bg-background-secondary p-4 lg:grid-cols-3">
      {Object.entries(data[0] as GolferStats).map(([key, value]) => (
        <div key={key} className="space-y-1">
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/70">
            {key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
