import { HoleInputRow } from "./hole-input-row";
import { SelectInteger } from "./select-integer";

type PuttsInputProps = {
  value?: number | null;
  onChange?: (value: number | null) => void;
};

export const PuttsInput = ({ value, onChange }: PuttsInputProps) => {
  return (
    <HoleInputRow label="Putts">
      <SelectInteger min={0} max={4} value={value} onChange={onChange} />
    </HoleInputRow>
  );
};
