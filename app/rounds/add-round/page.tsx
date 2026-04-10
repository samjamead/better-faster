import { AddRoundForm } from "@/components/add-round/add-round-form";
import { exampleTeeData } from "@/data/exampleTeeData";

export default function Page() {
  const exampleHandicapIndex = 10.9;

  return (
    <div className="w-full p-4 md:p-12">
      <div className="mx-auto max-w-4xl space-y-4 rounded border p-4">
        <h2>ADD ROUND</h2>
        <AddRoundForm
          teeData={exampleTeeData}
          handicapIndex={exampleHandicapIndex}
        />
      </div>
    </div>
  );
}
