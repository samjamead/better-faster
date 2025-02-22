import { createClient } from "@/lib/supabase/server";

export default async function GolferSummary() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("golfer_stats")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-1 font-mono font-medium tracking-wide">
      <p>
        {data.name} ({data.handicap}) makes birdie every {data.holes_per_birdie}{" "}
        holes
      </p>
    </div>
  );
}
