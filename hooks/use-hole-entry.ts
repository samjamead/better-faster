"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  type UpdateHoleEntryInput,
  updateHoleEntry,
} from "@/api/update-hole-entry";
import { getApproachOutcome } from "@/lib/approach-outcome";
import type {
  ApproachOutcome,
  ApproachSelection,
} from "@/types/approach";
import type { WideHoleData } from "@/types/wide-hole-data";

type EditableHoleFields = Pick<
  WideHoleData,
  | "gross"
  | "putts"
  | "tee_club"
  | "hit_fairway"
  | "fairway_miss"
  | "tee_penalty"
  | "approach_club"
  | "gir"
  | "approach_outcome"
  | "approach_penalty"
  | "chipping_club"
>;

type DerivedHoleFields = Pick<
  WideHoleData,
  "net" | "stableford" | "scrambling" | "up_and_down"
>;

type HoleMetadata = Pick<WideHoleData, "par" | "shots_given">;

type HoleState = EditableHoleFields &
  DerivedHoleFields &
  HoleMetadata & {
    id: number;
    hole_number: number;
    approach_selection: ApproachSelection | null;
  };

type HoleEntryDraft = Partial<EditableHoleFields> & {
  approach_selection?: ApproachSelection | null;
};

const toApproachSelection = (entry: WideHoleData): ApproachSelection | null => {
  const outcome = getApproachOutcome(entry);

  if (outcome) {
    return outcome;
  }

  return entry.par === 3 && entry.gir === true ? "hit" : null;
};

const createHoleState = (entry: WideHoleData): HoleState => ({
  id: entry.id,
  hole_number: entry.hole_number,
  par: entry.par,
  shots_given: entry.shots_given ?? null,
  gross: entry.gross ?? null,
  putts: entry.putts ?? null,
  tee_club: entry.tee_club ?? null,
  hit_fairway: entry.hit_fairway,
  fairway_miss: entry.fairway_miss ? entry.fairway_miss.toLowerCase() : null,
  tee_penalty: entry.tee_penalty ?? null,
  approach_club: entry.approach_club ?? null,
  gir: entry.gir,
  approach_outcome: getApproachOutcome(entry),
  approach_penalty: entry.approach_penalty ?? null,
  chipping_club: entry.chipping_club ?? null,
  net: entry.net ?? null,
  stableford: entry.stableford ?? null,
  scrambling: entry.scrambling ?? null,
  up_and_down: entry.up_and_down ?? null,
  approach_selection: toApproachSelection(entry),
});

const clampStableford = (value: number) => {
  if (value < 0) return 0;
  if (value > 5) return 5;
  return value;
};

const calculateStableford = (par: number, net: number | null) => {
  if (net === null) return null;
  return clampStableford(2 + (par - net));
};

const withDerivedFields = (hole: HoleState): HoleState => {
  const shotsGiven =
    typeof hole.shots_given === "number" ? hole.shots_given : 0;
  const net = typeof hole.gross === "number" ? hole.gross - shotsGiven : null;
  const stableford = calculateStableford(hole.par, net);
  const scrambling =
    hole.gir === false && typeof hole.gross === "number"
      ? hole.gross <= hole.par
      : null;
  const hasChipAttempt = hole.chipping_club !== null;
  const upAndDown =
    hasChipAttempt && typeof hole.putts === "number" ? hole.putts === 1 : null;

  return {
    ...hole,
    net,
    stableford,
    scrambling,
    up_and_down: upAndDown,
  };
};

const applyLogicalRules = (
  hole: HoleState,
  updates: HoleEntryDraft,
): HoleState => {
  const normalizedUpdates: HoleEntryDraft = { ...updates };

  if (typeof normalizedUpdates.fairway_miss === "string") {
    normalizedUpdates.fairway_miss =
      normalizedUpdates.fairway_miss.toLowerCase();
  }

  if (typeof normalizedUpdates.approach_outcome === "string") {
    normalizedUpdates.approach_outcome =
      normalizedUpdates.approach_outcome.toLowerCase() as ApproachOutcome;
  }

  if (
    typeof normalizedUpdates.approach_selection === "string" &&
    normalizedUpdates.approach_selection
  ) {
    normalizedUpdates.approach_selection =
      normalizedUpdates.approach_selection.toLowerCase() as ApproachSelection;
  }

  const next: HoleState = {
    ...hole,
    ...normalizedUpdates,
  };

  if ("approach_selection" in normalizedUpdates) {
    next.approach_selection = normalizedUpdates.approach_selection ?? null;
    if (normalizedUpdates.approach_selection === null) {
      next.approach_outcome = null;
      next.approach_penalty = null;
    } else if (normalizedUpdates.approach_selection === "hit") {
      next.approach_outcome = "hit";
      next.approach_penalty = null;
    } else if (normalizedUpdates.approach_selection) {
      next.approach_outcome = normalizedUpdates.approach_selection;
    }
  }

  const isParThree = next.par === 3;
  if (isParThree) {
    next.hit_fairway = null;
    next.fairway_miss = null;
    next.tee_penalty = null;
    if (next.gir === true) {
      next.approach_club = next.tee_club ?? null;
    }
  }

  if (next.hit_fairway === null && next.fairway_miss === null) {
    next.tee_penalty = null;
  }

  if (isParThree && next.gir === true) {
    next.approach_outcome = "hit";
    next.approach_penalty = null;
    next.approach_selection = "hit";
  }

  if (next.approach_selection === null && next.approach_outcome !== null) {
    next.approach_outcome = null;
  }

  return withDerivedFields(next);
};

const buildDrafts = (roundData: WideHoleData[]) =>
  roundData.reduce<Record<number, HoleState>>((acc, entry) => {
    acc[entry.hole_number] = applyLogicalRules(createHoleState(entry), {});
    return acc;
  }, {});

const toUpdateInput = (draft: HoleState): UpdateHoleEntryInput => ({
  holeId: draft.id,
  gross: draft.gross,
  putts: draft.putts,
  tee_club: draft.tee_club,
  hit_fairway: draft.hit_fairway,
  fairway_miss: draft.fairway_miss,
  tee_penalty: draft.tee_penalty,
  approach_club: draft.approach_club,
  gir: draft.gir,
  approach_outcome: draft.approach_outcome,
  approach_penalty: draft.approach_penalty,
  chipping_club: draft.chipping_club,
  up_and_down: draft.up_and_down,
  net: draft.net,
  stableford: draft.stableford,
  scrambling: draft.scrambling,
});

export const useHoleEntry = (
  roundId: number,
  roundData: WideHoleData[],
  initialHoleNumber?: number,
) => {
  const queryClient = useQueryClient();

  const holeNumbers = useMemo(() => {
    const numbers = roundData
      .map((entry) => entry.hole_number)
      .sort((a, b) => a - b);
    return numbers;
  }, [roundData]);

  const firstHoleNumber = holeNumbers[0] ?? 1;

  const [selectedHole, setSelectedHole] = useState(
    initialHoleNumber ?? firstHoleNumber,
  );
  const [drafts, setDrafts] = useState<Record<number, HoleState>>(() =>
    buildDrafts(roundData),
  );

  type OptimisticContext = {
    previousData?: WideHoleData[];
  };

  const holeUpdateMutation = useMutation<
    Awaited<ReturnType<typeof updateHoleEntry>>,
    Error,
    UpdateHoleEntryInput,
    OptimisticContext
  >({
    mutationFn: (input: UpdateHoleEntryInput) => updateHoleEntry(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ["wide_hole_data"] });
      const previousData = queryClient.getQueryData<WideHoleData[]>([
        "wide_hole_data",
      ]);

      if (previousData) {
        queryClient.setQueryData<WideHoleData[]>(
          ["wide_hole_data"],
          previousData.map((hole) =>
            hole.id === input.holeId ? { ...hole, ...input } : hole,
          ),
        );
      }

      return { previousData };
    },
    onError: (_error, _input, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["wide_hole_data"], context.previousData);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["wide_hole_data"],
      });
    },
  });

  useEffect(() => {
    startTransition(() => {
      setDrafts(buildDrafts(roundData));
      if (roundData.length === 0) return;
      setSelectedHole((prev) => {
        if (roundData.some((entry) => entry.hole_number === prev)) {
          return prev;
        }
        return firstHoleNumber;
      });
    });
  }, [roundData, firstHoleNumber]);

  const currentEntry = drafts[selectedHole] ?? null;

  const updateHole = useCallback(
    (holeNumber: number, updates: HoleEntryDraft) => {
      setDrafts((prev) => {
        const existing =
          prev[holeNumber] ??
          (() => {
            const hole = roundData.find(
              (entry) => entry.hole_number === holeNumber,
            );
            if (!hole) return null;
            return withDerivedFields(createHoleState(hole));
          })();

        if (!existing) {
          return prev;
        }

        return {
          ...prev,
          [holeNumber]: applyLogicalRules(existing, updates),
        };
      });
    },
    [roundData],
  );

  const persistHole = useCallback(
    async (holeNumber: number) => {
      const draft = drafts[holeNumber];
      if (!draft) {
        throw new Error(
          `Unable to find hole ${holeNumber} for round ${roundId}`,
        );
      }
      await holeUpdateMutation.mutateAsync(toUpdateInput(draft));
    },
    [drafts, holeUpdateMutation, roundId],
  );

  return {
    roundId,
    selectedHole,
    setSelectedHole,
    drafts,
    currentEntry,
    updateHole,
    persistHole,
    isSaving: holeUpdateMutation.isPending,
    saveError: holeUpdateMutation.error ?? null,
    holeNumbers,
  };
};
