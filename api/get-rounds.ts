"use server";

import { createClient } from "@/lib/supabase/server";

export async function getRounds() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rounds")
    .select("*")
    .order("date", { ascending: false });
  if (error) {
    console.error(error);
  }
  return data;
}
