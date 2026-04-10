"use client";

import { cn } from "@/lib/utils";

import { HoleInputRow } from "./hole-input-row";

type FairwayInputProps = {
  hit_fairway: boolean | null | undefined;
  fairway_miss: string | null | undefined;
  tee_penalty: boolean | null | undefined;
  disabled?: boolean;
  onChange?: (value: {
    hit_fairway: boolean | null;
    fairway_miss: string | null;
    tee_penalty: boolean | null;
  }) => void;
};

export const FairwayInput = ({
  hit_fairway,
  fairway_miss,
  tee_penalty,
  disabled = false,
  onChange,
}: FairwayInputProps) => {
  const options = [
    { value: "left", label: "Left" },
    { value: "hit", label: "Hit" },
    { value: "right", label: "Right" },
    { value: "long", label: "Long" },
    { value: "short", label: "Short" },
  ] as const;
  const selectedValue = hit_fairway === true ? "hit" : fairway_miss ?? null;

  const handleSelect = (option: string) => {
    if (disabled) return;

    if (option === "hit") {
      if (selectedValue === "hit") {
        onChange?.({
          hit_fairway: null,
          fairway_miss: null,
          tee_penalty: null,
        });
        return;
      }

      onChange?.({
        hit_fairway: true,
        fairway_miss: null,
        tee_penalty: false,
      });
      return;
    }

    if (selectedValue === option) {
      onChange?.({
        hit_fairway: null,
        fairway_miss: null,
        tee_penalty: null,
      });
      return;
    }

    onChange?.({
      hit_fairway: false,
      fairway_miss: option,
      tee_penalty: tee_penalty ?? false,
    });
  };

  return (
    <HoleInputRow label="Fairway">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              className={cn(
                "rounded border px-2 py-1 text-center",
                disabled && "cursor-not-allowed opacity-50",
                selectedValue === option.value &&
                  option.value === "hit" &&
                  "bg-emerald-600/50",
                selectedValue === option.value &&
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
        {selectedValue && selectedValue !== "hit" && (
          <button
            className={cn(
              "rounded border px-2 py-1 text-center",
              tee_penalty && "bg-rose-600/50",
              disabled && "cursor-not-allowed opacity-50",
            )}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              onChange?.({
                hit_fairway: hit_fairway ?? false,
                fairway_miss: fairway_miss ?? selectedValue,
                tee_penalty: !(tee_penalty ?? false),
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
