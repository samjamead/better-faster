"use server";

import { createClient } from "@/lib/supabase/server";

export const getGolferSummary = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("golfer_stats")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
