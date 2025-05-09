import { testsConfig, TestType } from "../../testsConfig";
import InvalidTestType from "@/components/error-states/invalid-test-type";
import { createClient } from "@/lib/supabase/server";
import PuttingTestForm from "@/components/tests/putting-test-form";
import WedgeTestForm from "@/components/tests/wedge-test-form";

export default async function NewTestPage({
  params,
}: {
  params: Promise<{ type: TestType }>;
}) {
  const { type } = await params;
  const pageConfig = testsConfig[type];

  if (!pageConfig) {
    return <InvalidTestType type={type} />;
  }

  const supabase = await createClient();
  const { data: golfer } = await supabase.from("golfers").select("*").single();

  if (!golfer) {
    return <div>You must be logged in to create a test</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {type === "putting" && <PuttingTestForm golfer={golfer} />}
      {type === "wedge" && <WedgeTestForm golfer={golfer} />}
    </div>
  );
}
