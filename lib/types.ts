export type Golfer = {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  golfer_name: string; // text
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

export type WedgeTest = {
  id?: number;
  golfer_id: string;
  created_at?: string;
  test_date: string;
  shots_hit?: number;
  total_proximity?: number;
  average_proximity?: number;
  landing_spot_percentage?: number;
  trajectory_percentage?: number;
  quality_contact_percentage?: number;
};

export type PuttingTest = {
  id?: number;
  golfer_id: string;
  test_date: string;
  created_at?: string;
  average_proximity?: number;
  good_line_percentage?: number;
  good_speed_percentage?: number;
  good_read_percentage?: number;
  strokes_gained_putting?: number;
};
