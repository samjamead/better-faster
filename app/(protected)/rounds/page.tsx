import { createClient } from "@/lib/supabase/server";

export default async function Rounds() {
  const supabase = await createClient();

  const { data: rounds, error } = await supabase.from("rounds").select("*");

  if (error) {
    <div>Error loading rounds</div>;
  }

  return (
    <div>
      {rounds?.map((round) => (
        <div key={round.id}>
          <p>{round.round_date}</p>
          <p>{round.round_course}</p>
        </div>
      ))}
    </div>
  );
}
