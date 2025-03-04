"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export type CounterProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  unit?: string;
  className?: string;
};

export const Counter = ({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  label,
  unit,
  className,
}: CounterProps) => {
  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <Label>{label}</Label>
      <div className="flex w-[180px] items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">
          <span className="text-lg font-medium">{value}</span>
          {unit && <span className="ml-1 text-muted-foreground">{unit}</span>}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
