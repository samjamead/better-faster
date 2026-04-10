"use server";

import { createClient } from "@/lib/supabase/server";
import type { WideHoleData } from "@/types/wide-hole-data";

type EditableHoleFields = Pick<
  WideHoleData,
  | "gross"
  | "putts"
  | "tee_club"
  | "hit_fairway"
  | "fairway_miss"
  | "tee_penalty"
  | "approach_club"
  | "gir"
  | "approach_outcome"
  | "approach_penalty"
  | "chipping_club"
  | "up_and_down"
  | "net"
  | "stableford"
  | "scrambling"
>;

export type UpdateHoleEntryInput = {
  holeId: number;
} & EditableHoleFields;

export type UpdateHoleEntryResult = {
  holeId: number;
};

export const updateHoleEntry = async (
  payload: UpdateHoleEntryInput,
): Promise<UpdateHoleEntryResult> => {
  const { holeId, ...fields } = payload;
  const supabase = await createClient();

  const updates = Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(updates).length === 0) {
    return { holeId };
  }

  const { error } = await supabase
    .from("wide_hole_data")
    .update(updates)
    .eq("id", holeId);

  if (error) {
    throw new Error(error.message);
  }

  return { holeId };
};
