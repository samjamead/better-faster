"use client";

import { useCallback } from "react";

import { useParams } from "next/navigation";

import { ApproachInput } from "@/components/add-hole-data/approach-input";
import { FairwayInput } from "@/components/add-hole-data/fairway-input";
import { GirInput } from "@/components/add-hole-data/gir-input";
import { GrossInput } from "@/components/add-hole-data/gross-input";
import { HoleSelection } from "@/components/add-hole-data/hole-selection";
import { PuttsInput } from "@/components/add-hole-data/putts-input";
import { RoundSummary } from "@/components/add-hole-data/round-summary";
import { SelectClub } from "@/components/add-hole-data/select-club";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useHoleEntry } from "@/hooks/use-hole-entry";
import { useRoundData } from "@/hooks/use-round-data";

export default function RoundPage() {
  const { round } = useParams<{ round: string }>();

  if (!round) {
    return <div>Round ID missing</div>;
  }

  const numericRoundId = Number(round);

  if (Number.isNaN(numericRoundId)) {
    return <div>Round ID must be a number.</div>;
  }

  return (
    <RoundPageContent
      roundId={numericRoundId}
      roundLabel={round.padStart(3, "0")}
    />
  );
}

type RoundPageContentProps = {
  roundId: number;
  roundLabel: string;
};

const RoundPageContent = ({ roundId, roundLabel }: RoundPageContentProps) => {
  const { roundData, summary, holeSummaries, isLoading, error } =
    useRoundData(roundId);
  const {
    selectedHole,
    setSelectedHole,
    currentEntry,
    updateHole,
    persistHole,
    isSaving,
    saveError,
    holeNumbers,
  } = useHoleEntry(roundId, roundData);

  const handleSave = useCallback(() => {
    void persistHole(selectedHole).catch(() => {});
  }, [persistHole, selectedHole]);

  const saveAndNavigate = useCallback(
    async (direction: -1 | 1) => {
      if (holeNumbers.length === 0) return;
      const currentIndex = holeNumbers.findIndex((num) => num === selectedHole);
      if (currentIndex === -1) return;
      const nextIndex = currentIndex + direction;
      if (nextIndex < 0 || nextIndex >= holeNumbers.length) return;
      try {
        await persistHole(selectedHole);
        setSelectedHole(holeNumbers[nextIndex]);
      } catch {
        // error surfaced via saveError
      }
    },
    [holeNumbers, persistHole, selectedHole, setSelectedHole],
  );

  const handleBack = useCallback(() => {
    void saveAndNavigate(-1);
  }, [saveAndNavigate]);

  const handleNext = useCallback(() => {
    void saveAndNavigate(1);
  }, [saveAndNavigate]);

  if (isLoading) return <div>Loading round {roundLabel}</div>;

  if (error)
    return (
      <div>
        Error finding data for round {roundLabel}: {error.message}
      </div>
    );

  const activeHole =
    holeSummaries.find((hole) => hole.holeNumber === selectedHole) ?? null;
  const holeIndex = holeNumbers.findIndex((num) => num === selectedHole);
  const disableBack = holeNumbers.length === 0 || holeIndex <= 0;
  const disableNext =
    holeNumbers.length === 0 || holeIndex === holeNumbers.length - 1;
  const isParThree = currentEntry?.par === 3;
  const girIsTrue = currentEntry?.gir === true;
  const simplifyParThreeInput = isParThree && girIsTrue;
  const approachSelection = currentEntry?.approach_selection ?? null;

  const courseHeading = summary?.course ?? "Course TBD";
  const sideLabel = summary?.side
    ? summary.holesPlayed === 9
      ? `(${summary.side} 9)`
      : `(${summary.side})`
    : null;
  const heading = activeHole
    ? `Hole ${activeHole.holeNumber} • Par ${activeHole.par} • ${activeHole.yards} yards • SI ${activeHole.strokeIndex}`
    : `Hole ${selectedHole}`;

  return (
    <div className="flex flex-col items-start gap-6 border-t pt-6">
      <div className="space-y-2">
        {summary ? (
          <p className="text-muted-foreground text-sm">{summary.date}</p>
        ) : (
          <p className="text-muted-foreground text-sm">
            No stats logged yet for this round.
          </p>
        )}
        <div className="flex items-center gap-4">
          <h2>Round {roundLabel}:</h2>

          <p>
            {courseHeading}
            {sideLabel && (
              <span className="text-muted-foreground ml-4 text-sm">
                {sideLabel}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <RoundSummary summary={summary} />
        <div className="flex w-full flex-col items-start gap-6">
          <HoleSelection
            selectedHole={selectedHole}
            onSelect={(hole) => setSelectedHole(hole)}
            holes={holeSummaries}
            summary={summary}
          />
          <Card heading={heading} className="max-w-full">
            <div className="space-y-4 py-2 text-sm">
              <GrossInput
                value={currentEntry?.gross ?? null}
                onChange={(value) => updateHole(selectedHole, { gross: value })}
              />

              <SelectClub
                label="Tee Club"
                value={currentEntry?.tee_club ?? null}
                onSelect={(club) =>
                  updateHole(selectedHole, { tee_club: club ?? null })
                }
              />
              <FairwayInput
                hit_fairway={currentEntry?.hit_fairway ?? null}
                fairway_miss={currentEntry?.fairway_miss ?? null}
                tee_penalty={currentEntry?.tee_penalty ?? null}
                disabled={isParThree}
                onChange={(values) => updateHole(selectedHole, values)}
              />

              <GirInput
                value={currentEntry?.gir ?? null}
                onChange={(value) => updateHole(selectedHole, { gir: value })}
              />

              <SelectClub
                label="Approach Club"
                value={currentEntry?.approach_club ?? null}
                disabled={simplifyParThreeInput}
                onSelect={(club) =>
                  updateHole(selectedHole, { approach_club: club ?? null })
                }
              />

              <ApproachInput
                selection={approachSelection}
                approach_penalty={currentEntry?.approach_penalty ?? null}
                disabled={simplifyParThreeInput}
                onChange={(values) => updateHole(selectedHole, values)}
              />

              <SelectClub
                label="Chipping Club"
                value={currentEntry?.chipping_club ?? null}
                onSelect={(club) =>
                  updateHole(selectedHole, { chipping_club: club ?? null })
                }
              />

              <PuttsInput
                value={currentEntry?.putts ?? null}
                onChange={(value) => updateHole(selectedHole, { putts: value })}
              />

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isSaving || disableBack}
                  onClick={handleBack}
                >
                  Back
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? "Saving…" : "Save"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isSaving || disableNext}
                  onClick={handleNext}
                >
                  Next
                </Button>

                {saveError && (
                  <p className="text-destructive text-sm">
                    {saveError.message}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
