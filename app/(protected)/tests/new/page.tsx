import Link from "next/link";

export default function NewTestPage() {
  return (
    <div>
      <Link href="/tests/new/wedge">Wedge Test</Link>
      <Link href="/tests/new/putting">Putting Test</Link>
    </div>
  );
}
