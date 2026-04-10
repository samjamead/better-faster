"use client";

import { cn } from "@/lib/utils";

import { HoleInputRow } from "./hole-input-row";

type GirInputProps = {
  value: boolean | null | undefined;
  onChange?: (value: boolean | null) => void;
};

export const GirInput = ({ value, onChange }: GirInputProps) => {
  const options = ["True", "False"];
  const selectedOption =
    value === null || value === undefined ? null : value ? "True" : "False";

  return (
    <HoleInputRow label="GIR">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          {options.map((option) => (
            <button
              key={option}
              className={cn(
                "rounded border px-2 py-1 text-center",
                selectedOption === option &&
                  selectedOption == "True" &&
                  "bg-emerald-600/50",
                selectedOption === option &&
                  selectedOption == "False" &&
                  "bg-rose-600/40",
              )}
              type="button"
              onClick={() => {
                if (selectedOption === option) {
                  onChange?.(null);
                  return;
                }
                onChange?.(option === "True");
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </HoleInputRow>
  );
};
