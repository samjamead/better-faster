"use server";

import { createClient } from "@/lib/supabase/server";
import { PuttingTest, WedgeTest } from "@/lib/types";

export async function getWedgeTests() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("wedge_tests").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPuttingTests() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("putting_tests").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export type CreatePuttingTestData = {
  golfer_id: string;
  test_date: string;
};

export async function upsertPuttingTest(data: PuttingTest) {
  const supabase = await createClient();

  const payload = {
    ...data,
    created_at: data.created_at || new Date().toISOString(),
  };

  const { data: test, error } = await supabase
    .from("putting_tests")
    .upsert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return test;
}

export type PuttingTestData = {
  test_id: number;
  golfer_id: string;
  distance: number;
  score: number;
  strokes_gained_putting: number;
  good_line: boolean;
  good_speed: boolean;
  good_read: boolean;
  proximity: number;
};

export async function logPuttingTestData(data: PuttingTestData) {
  const supabase = await createClient();

  const { error } = await supabase.from("putting_test_data").insert({
    test_id: data.test_id,
    golfer_id: data.golfer_id,
    distance: data.distance,
    score: data.score,
    strokes_gained_putting: data.strokes_gained_putting,
    good_line: data.good_line,
    good_speed: data.good_speed,
    good_read: data.good_read,
    proximity: data.proximity,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export type WedgeTestData = {
  wedge_test_id: number;
  golfer_id: string;
  target_distance_yards: number;
  target_flight: "low" | "mid" | "high";
  landing_spot_hit: boolean;
  desired_trajectory_hit: boolean;
  quality_contact: boolean;
  proximity_feet: number;
};

export async function upsertWedgeTest(data: WedgeTest) {
  const supabase = await createClient();

  const payload = {
    ...data,
    created_at: data.created_at || new Date().toISOString(),
  };

  const { data: test, error } = await supabase
    .from("wedge_tests")
    .upsert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return test;
}

export async function logWedgeTestData(data: WedgeTestData) {
  const supabase = await createClient();

  const { error } = await supabase.from("wedge_test_data").insert({
    wedge_test_id: data.wedge_test_id,
    golfer_id: data.golfer_id,
    target_distance_yards: data.target_distance_yards,
    target_flight: data.target_flight,
    landing_spot_hit: data.landing_spot_hit,
    desired_trajectory_hit: data.desired_trajectory_hit,
    quality_contact: data.quality_contact,
    proximity_feet: data.proximity_feet,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(error.message);
  }
}
