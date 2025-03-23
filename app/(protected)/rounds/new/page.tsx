import { Heading2 } from "@/components/typography/typography";
import RoundForm from "@/components/rounds/round-form";
import { createClient } from "@/lib/supabase/server";

export default async function NewRound() {
  const supabase = await createClient();
  const { data: golfer } = await supabase.from("golfers").select("*").single();

  if (!golfer) {
    throw new Error("No golfer found");
  }

  return (
    <div className="flex flex-col gap-8">
      <Heading2>New Round</Heading2>
      <RoundForm golfer={golfer} />
    </div>
  );
}
