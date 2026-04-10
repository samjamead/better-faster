"use server";

import { createClient } from "@/lib/supabase/server";

export async function getWideHoleData() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("wide_hole_data")
    .select("*")
    .order("date");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
