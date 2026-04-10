"use client";

import { cn } from "@/lib/utils";
import type { ApproachSelection } from "@/types/approach";

import { HoleInputRow } from "./hole-input-row";

type ApproachInputProps = {
  selection: ApproachSelection | null | undefined;
  approach_penalty: boolean | null | undefined;
  disabled?: boolean;
  onChange?: (value: {
    approach_selection: ApproachSelection | null;
    approach_penalty: boolean | null;
  }) => void;
};

const APPROACH_OPTIONS: Array<{ value: ApproachSelection; label: string }> = [
  { value: "hit", label: "Hit" },
  { value: "sl", label: "SL" },
  { value: "short", label: "Short" },
  { value: "sr", label: "SR" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "ll", label: "LL" },
  { value: "long", label: "Long" },
  { value: "lr", label: "LR" },
];

export const ApproachInput = ({
  selection,
  approach_penalty,
  disabled = false,
  onChange,
}: ApproachInputProps) => {
  const selectedOption = selection ?? null;

  const handleSelect = (option: ApproachSelection) => {
    if (disabled) return;

    if (selectedOption === option) {
      onChange?.({
        approach_selection: null,
        approach_penalty: null,
      });
      return;
    }

    if (option === "hit") {
      onChange?.({
        approach_selection: "hit",
        approach_penalty: null,
      });
      return;
    }

    onChange?.({
      approach_selection: option,
      approach_penalty: approach_penalty ?? false,
    });
  };

  return (
    <HoleInputRow label="Approach Outcome">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          {APPROACH_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={cn(
                "rounded border px-2 py-1 text-center",
                disabled && "cursor-not-allowed opacity-50",
                selectedOption === option.value &&
                  option.value === "hit" &&
                  "bg-emerald-600/50",
                selectedOption === option.value &&
                  option.value !== "hit" &&
                  "bg-rose-600/50",
              )}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {selectedOption && selectedOption !== "hit" && (
          <button
            className={cn(
              "rounded border px-2 py-1 text-center",
              approach_penalty && "bg-rose-600/50",
              disabled && "cursor-not-allowed opacity-50",
            )}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              onChange?.({
                approach_selection: selectedOption,
                approach_penalty: !(approach_penalty ?? false),
              });
            }}
          >
            Penalty
          </button>
        )}
      </div>
    </HoleInputRow>
  );
};
