"use server";

import { createClient } from "@/lib/supabase/server";
import { Hole } from "@/types/tee-data";

export type NewRoundEntry = {
  datePlayed: string;
  course: string;
  tee: string;
  holesPlayed: 9 | 18;
  side: "front" | "back" | null;
  handicapIndex: number;
  courseRating: number;
  slopeRating: number;
  par: number;
  isCompetition: boolean;
  courseHandicap: number;
  playingHandicap: number;
  holes: Hole[];
};

export const createNewRoundEntry = async (
  payload: NewRoundEntry,
): Promise<{ roundId: number }> => {
  if (!payload.holes.length) {
    throw new Error("Unable to add round without hole data.");
  }

  if (payload.holesPlayed === 9 && !payload.side) {
    throw new Error("Selecting a side is required for nine-hole rounds.");
  }

  const supabase = await createClient();

  const { data: roundRow, error: roundError } = await supabase
    .from("rounds")
    .insert({ course_name: payload.course })
    .select("id")
    .single();

  if (roundError || !roundRow) {
    throw new Error(roundError?.message ?? "Unable to create round record.");
  }

  const holeEntries = payload.holes.map((hole) => {
    const strokeIndex =
      payload.holesPlayed === 9 && hole.si9holes ? hole.si9holes : hole.si;

    const shotGiven = payload.playingHandicap >= strokeIndex ? 1 : 0;

    return {
      round_id: roundRow.id,
      date: payload.datePlayed,
      course: payload.course,
      course_rating: payload.courseRating,
      slope_rating: payload.slopeRating,
      handicap_index: payload.handicapIndex,
      course_handicap: payload.courseHandicap,
      playing_handicap: payload.playingHandicap,
      holes_played: payload.holesPlayed,
      side_played: payload.holesPlayed === 9 ? payload.side : null,
      hole_number: hole.hole,
      tee_box: payload.tee,
      yards: hole.yards,
      stroke_index: strokeIndex,
      shots_given: shotGiven,
      par: hole.par,
      gross: null,
      net: null,
      stableford: null,
      tee_club: null,
      hit_fairway: null,
      fairway_miss: null,
      tee_penalty: null,
      approach_club: null,
      gir: null,
      approach_outcome: null,
      approach_penalty: null,
      chipping_club: null,
      up_and_down: null,
      scrambling: null,
      putts: null,
    };
  });

  const { error: holeInsertError } = await supabase
    .from("wide_hole_data")
    .insert(holeEntries);

  if (holeInsertError) {
    throw new Error(holeInsertError.message);
  }

  return { roundId: roundRow.id };
};
