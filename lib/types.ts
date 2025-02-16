export type Golfer = {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  golfer_name: string; // text
};

export type Round = {
  id: number;
  created_at: string;
  edited_at: string | null;
  date: string;
  course: string;
  tee: string;
  holes_played: number;
  side: string | null;
  par: number;
  net: number;
  stableford: number | null;
  fairways_hit: number | null;
  greens_in_regulation: number | null;
  up_and_down: number | null;
  putts: number | null;
  penalty_strokes: number | null;
  handicap_index: number | null;
  playing_handicap: number | null;
  golfer_id: string;
  greens_on_par_three: number | null;
  greens_from_fairway: number | null;
  greens_from_rough: number | null;
  birdies: number | null;
  double_bogeys: number | null;
  three_putts: number | null;
};

export type RoundAverages = {
  golfer_id: string;
  avg_fairways_hit: number | null;
  avg_greens_in_regulation: number | null;
  avg_up_and_down: number | null;
  avg_putts_per_hole: number | null;
  avg_greens_on_par_three: number | null;
  avg_greens_from_fairway: number | null;
  avg_greens_from_rough: number | null;
  avg_birdies: number | null;
  avg_double_bogeys: number | null;
  avg_three_putts: number | null;
  avg_penalty_strokes: number | null;
};
