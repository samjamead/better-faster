import { Plus } from "lucide-react";
import Link from "next/link";

export default function AddEntryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md bg-secondary/50 px-2 py-1 text-sm text-foreground/90"
    >
      <Plus className="h-4 w-4" strokeWidth={2} /> <span>{children}</span>
    </Link>
  );
}
