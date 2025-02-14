export type Golfer = {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  golfer_name: string; // text
};

export type Round = {
  id: number; // bigint
  created_at: string; // timestamp with time zone
  edited_at: string; // timestamp with time zone
  round_date: string; // date
  round_course: string; // text
  round_tee: string; // text
  round_holes: number; // smallint
  round_side: string; // text
  round_par: number; // smallint
  round_gross: number; // smallint
  round_net: number; // smallint
  round_stableford: number; // smallint
  round_fairways_hit: number; // double precision
  round_greens_in_regulation: number; // double precision
  round_up_and_down: number; // double precision
  round_putts: number; // smallint
  round_penalty_strokes: number; // smallint
  round_handicap_index: number; // double precision (Handicap index at the start of the round)
  round_playing_handicap: number; // smallint (Shots received that day)
  round_golfer: Golfer;
};
