import SummaryStats from "@/components/summary-stats/summary-stats";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8">
      <SummaryStats />
    </div>
  );
}
