"use client";

import { toast } from "sonner";

export default function ExampleComponent() {
  return (
    <div>
      <button
        className="rounded-md bg-blue-500/40 px-3 py-2 text-sm transition-colors duration-300 hover:bg-blue-500/30"
        onClick={() => toast.success("Toast's up!")}
      >
        Pop the toast
      </button>
    </div>
  );
}
