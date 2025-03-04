import { Heading2 } from "@/components/typography/typography";
import { Golfer } from "@/lib/types";

export default function PuttingTestForm({ golfer }: { golfer: Golfer }) {
  return (
    <div className="flex flex-col gap-4 rounded border p-8">
      <Heading2>Putting Test</Heading2>
      <p>{golfer.id}</p>
    </div>
  );
}
