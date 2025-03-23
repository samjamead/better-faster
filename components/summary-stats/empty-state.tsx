import { CircleDashed, SquareDashed } from "lucide-react";

export const TriangleDashed = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-triangle-dashed"
  >
    <path d="M10.17 4.193a2 2 0 0 1 3.666.013" />
    <path d="M14 21h2" />
    <path d="m15.874 7.743 1 1.732" />
    <path d="m18.849 12.952 1 1.732" />
    <path d="M21.824 18.18a2 2 0 0 1-1.835 2.824" />
    <path d="M4.024 21a2 2 0 0 1-1.839-2.839" />
    <path d="m5.136 12.952-1 1.732" />
    <path d="M8 21h2" />
    <path d="m8.102 7.743-1 1.732" />
  </svg>
);

export default function EmptyState() {
  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold">Summary</h2>
      <div className="flex min-h-[250px] flex-col items-center justify-center gap-2 rounded-md border bg-background-secondary p-4 lg:p-12">
        <h3 className="text-lg font-bold">No data... yet</h3>
        <div className="flex items-center justify-center gap-4 p-4">
          <div className="rounded border border-black bg-background p-3 shadow">
            <SquareDashed className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="rounded border border-black bg-background p-3 text-muted-foreground shadow">
            <TriangleDashed />
          </div>
          <div className="rounded border border-black bg-background p-3 shadow">
            <CircleDashed className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <p>Add your first round to see summary stats</p>
      </div>
    </div>
  );
}
