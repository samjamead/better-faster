import { HoleInputRow } from "./hole-input-row";
import { SelectInteger } from "./select-integer";

type GrossInputProps = {
  value?: number | null;
  onChange?: (value: number | null) => void;
};

export const GrossInput = ({ value, onChange }: GrossInputProps) => {
  return (
    <HoleInputRow label="Gross Score">
      <SelectInteger min={1} max={10} value={value} onChange={onChange} />
    </HoleInputRow>
  );
};
