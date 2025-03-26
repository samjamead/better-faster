import Link from "next/link";
import { Heading2 } from "@/components/typography/typography";

export default function DrillsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-baseline gap-8">
        <Heading2>Drills</Heading2>
        <ul className="flex gap-6">
          <li>
            <Link href="/drills/full-swing">Full Swing</Link>
          </li>
          <li>
            <Link href="/drills/wedge">Wedge</Link>
          </li>
          <li>
            <Link href="/drills/putting">Putting</Link>
          </li>
        </ul>
      </div>
      <div className="rounded-md bg-card p-8">
        Todo: Add list of completed drills
      </div>
    </div>
  );
}
