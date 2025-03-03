"use server";

import { createClient } from "@/lib/supabase/server";

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
