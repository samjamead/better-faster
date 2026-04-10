"use client";

import { cn } from "@/lib/utils";

type SelectIntegerProps = {
  min: number;
  max: number;
  value?: number | null;
  onChange?: (value: number | null) => void;
  disabled?: boolean;
};

export const SelectInteger = ({
  min,
  max,
  value,
  onChange,
  disabled = false,
}: SelectIntegerProps) => {
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  return (
    <div className="flex gap-2 lg:gap-3">
      {numbers.map((num) => (
        <button
          key={num}
          className={cn(
            "h-8 w-8 rounded border",
            value === num && "border-indigo-800 bg-indigo-600 text-white",
            disabled && "cursor-not-allowed opacity-50",
          )}
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            onChange?.(value === num ? null : num);
          }}
        >
          {num}
        </button>
      ))}
    </div>
  );
};
