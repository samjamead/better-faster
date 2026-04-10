"use client";

import { CLUBS_IN_ORDER } from "@/lib/summary-calculations/constants";
import { cn } from "@/lib/utils";

import { HoleInputRow } from "./hole-input-row";

type SelectClubProps = {
  label: string;
  value?: string | number | null;
  onSelect?: (club: string | null) => void;
  includePutter?: boolean;
  disabled?: boolean;
};

export const SelectClub = ({
  label,
  value,
  onSelect,
  includePutter = false,
  disabled = false,
}: SelectClubProps) => {
  return (
    <HoleInputRow label={label}>
      <div className="flex gap-3 text-sm tracking-wide">
        {CLUBS_IN_ORDER.filter(
          (club) => includePutter || club !== "Putter",
        ).map((club) => (
          <div key={club} className="flex flex-col gap-2">
            <button
              key={club}
              className={cn(
                "rounded border px-2 py-1",
                value === club && "border-indigo-800 bg-indigo-600 text-white",
                disabled && "cursor-not-allowed opacity-50",
              )}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                const nextValue = value === club ? null : club;
                onSelect?.(nextValue);
              }}
            >
              {club}
            </button>
          </div>
        ))}
      </div>
    </HoleInputRow>
  );
};
