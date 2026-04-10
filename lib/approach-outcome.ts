import type { ApproachOutcome } from "@/types/approach";
import type { WideHoleData } from "@/types/wide-hole-data";

export const APPROACH_OUTCOME_VALUES: ApproachOutcome[] = [
  "hit",
  "sl",
  "short",
  "sr",
  "left",
  "right",
  "ll",
  "long",
  "lr",
];

export const isApproachOutcome = (
  value: string | null | undefined,
): value is ApproachOutcome =>
  value !== null &&
  value !== undefined &&
  APPROACH_OUTCOME_VALUES.includes(value as ApproachOutcome);

export const getApproachOutcome = (
  hole: Pick<WideHoleData, "approach_outcome">,
): ApproachOutcome | null =>
  isApproachOutcome(hole.approach_outcome) ? hole.approach_outcome : null;

export const hasLoggedApproachOutcome = (
  hole: Pick<WideHoleData, "approach_outcome">,
) => getApproachOutcome(hole) !== null;

export const approachHitGreen = (
  hole: Pick<WideHoleData, "approach_outcome">,
) => getApproachOutcome(hole) === "hit";

export const approachMissDirection = (
  hole: Pick<WideHoleData, "approach_outcome">,
) => {
  const outcome = getApproachOutcome(hole);
  if (!outcome || outcome === "hit") return null;
  return outcome;
};
