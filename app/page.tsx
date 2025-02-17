import RealityCheck from "@/components/reality-check/reality-check";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SummaryCard from "@/components/summary-card/summary-card";
export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[3fr_2fr]">
      <SummaryCard />
      <RealityCheck />
    </div>
  );
}
