"use server";

import { createClient } from "@/lib/supabase/server";

export async function getRounds() {
  const supabase = await createClient();
  const { data: rounds, error } = await supabase
    .from("rounds")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return rounds;
}

export type RoundData = {
  date: string;
  course: string;
  tee: string;
  holes_played: number;
  side: string | null;
  par: number;
  gross: number | null;
  net: number | null;
  stableford: number | null;
  handicap_index: number | null;
  playing_handicap: number | null;
  fairways_hit: number | null;
  greens_in_regulation: number | null;
  up_and_down: number | null;
  putts: number | null;
  penalty_strokes: number | null;
  birdies: number | null;
  double_bogeys: number | null;
  three_putts: number | null;
  greens_on_par_three: number | null;
  greens_from_fairway: number | null;
  greens_from_rough: number | null;
  golfer_id: string;
};

export async function upsertRound(data: RoundData) {
  const supabase = await createClient();
  const { error } = await supabase.from("rounds").insert([data]);

  if (error) {
    throw new Error(error.message);
  }
}
