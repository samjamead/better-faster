"use server";

import { createClient } from "@/lib/supabase/server";

export async function getHolesPlayed() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("wide_hole_data")
    .select("*")
    .order("date", { ascending: false })
    .order("hole_number", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
