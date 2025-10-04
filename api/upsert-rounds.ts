"use server";

import { createClient } from "@/lib/supabase/server";

import { Round } from "@/types/round";

export async function upsertRound(data: Round) {
  const supabase = await createClient();
  const { error } = await supabase.from("rounds").insert([data]);

  if (error) {
    throw new Error(error.message);
  }
}
