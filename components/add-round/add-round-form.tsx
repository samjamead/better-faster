"use client";

import { type FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { useCreateRoundEntry } from "@/hooks/use-create-round-entry";
import { cn } from "@/lib/utils";
import { type TeeData } from "@/types/tee-data";

type RoundFormState = {
  datePlayed: string;
  course: string;
  tee: string;
  holesPlayed: 9 | 18 | null;
  side: "front" | "back" | null;
  handicapIndex: string;
  isCompetition: boolean;
};

type AddRoundFormProps = {
  teeData: TeeData[];
  handicapIndex: number;
};

type TeeRatingKey = keyof Pick<TeeData, "par" | "courseRating" | "slopeRating">;

export const AddRoundForm = ({ teeData, handicapIndex }: AddRoundFormProps) => {
  const router = useRouter();
  const { createRoundEntry, isCreatingRound } = useCreateRoundEntry();
  const [formData, setFormData] = useState<RoundFormState>({
    datePlayed: "",
    course: "",
    tee: "",
    holesPlayed: null,
    side: null,
    handicapIndex: handicapIndex.toString(),
    isCompetition: false,
  });

  const courseOptions = Array.from(
    new Set(teeData.map((entry) => entry.course)),
  ).sort();

  const courseTeeOptions = teeData
    .filter((entry) => entry.course === formData.course)
    .sort((a, b) => a.tee.localeCompare(b.tee));

  const selectedTee = courseTeeOptions.find(
    (entry) => entry.tee === formData.tee,
  );

  const lookupRating = (rating: TeeRatingKey): number | null => {
    if (!selectedTee || !formData.tee || !formData.holesPlayed) return null;

    if (formData.holesPlayed === 18) {
      return selectedTee[rating];
    }

    if (formData.holesPlayed === 9 && formData.side) {
      const nineHoleRatings = selectedTee[formData.side];
      return nineHoleRatings ? nineHoleRatings[rating] : null;
    }

    return null;
  };

  const slopeRating = lookupRating("slopeRating");
  const coursePar = lookupRating("par");
  const courseRating = lookupRating("courseRating");
  const handicapIndexNumber = Number.parseFloat(formData.handicapIndex);
  const hasHandicapIndex = Number.isFinite(handicapIndexNumber);
  const hasCourseMetrics =
    slopeRating !== null && coursePar !== null && courseRating !== null;

  const holesPlayed = formData.holesPlayed;
  const canCalculateCourseHandicap =
    hasHandicapIndex &&
    holesPlayed !== null &&
    slopeRating !== null &&
    coursePar !== null &&
    courseRating !== null;

  const courseHandicap = !(
    canCalculateCourseHandicap &&
    slopeRating !== null &&
    coursePar !== null &&
    courseRating !== null &&
    holesPlayed !== null
  )
    ? null
    : Math.round(
        (handicapIndexNumber / (18 / holesPlayed)) * (slopeRating / 113) +
          (courseRating - coursePar),
      );

  const playingHandicap =
    courseHandicap === null
      ? null
      : Math.round(courseHandicap * (formData.isCompetition ? 0.95 : 1));

  const canSubmit =
    Boolean(formData.datePlayed) &&
    Boolean(formData.course) &&
    Boolean(formData.tee) &&
    Boolean(formData.holesPlayed) &&
    hasCourseMetrics &&
    hasHandicapIndex &&
    playingHandicap !== null;

  const holesData = (() => {
    if (!selectedTee) return undefined;
    if (formData.holesPlayed !== 9) return selectedTee.holes;

    if (formData.side === "front") {
      return selectedTee.holes.slice(0, 9);
    }

    if (formData.side === "back") {
      return selectedTee.holes.slice(9);
    }

    return undefined;
  })();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !hasCourseMetrics ||
      formData.holesPlayed === null ||
      !holesData ||
      playingHandicap === null ||
      courseHandicap === null ||
      !formData.datePlayed
    ) {
      return;
    }

    const payload = {
      datePlayed: formData.datePlayed,
      course: formData.course,
      tee: formData.tee,
      holesPlayed: formData.holesPlayed,
      side: formData.side,
      handicapIndex: handicapIndexNumber,
      courseRating: courseRating,
      slopeRating,
      par: coursePar,
      isCompetition: formData.isCompetition,
      courseHandicap,
      playingHandicap,
      holes: holesData,
    };

    try {
      const { roundId } = await createRoundEntry(payload);
      router.push(`/rounds/${roundId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const previewData = {
    ...formData,
    handicapIndex: hasHandicapIndex
      ? handicapIndexNumber
      : formData.handicapIndex,
    courseRating: courseRating,
    slopeRating,
    par: coursePar,
    isCompetition: formData.isCompetition,
    courseHandicap,
    playingHandicap,
  };

  return (
    <div className="flex w-full items-start gap-20">
      <form className="flex w-md flex-col gap-6 pb-4" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <label htmlFor="date-played" className="text-muted-foreground w-32">
            DATE
          </label>
          <input
            id="date-played"
            type="date"
            value={formData.datePlayed ?? ""}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                datePlayed: event.target.value,
              }))
            }
            className="w-xs rounded border p-2 text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="course-select" className="text-muted-foreground w-32">
            COURSE
          </label>
          <select
            id="course-select"
            value={formData.course ?? ""}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                course: event.target.value,
                tee: "",
                holesPlayed: null,
                side: null,
              }))
            }
            className="w-xs rounded border p-2 text-sm"
          >
            <option value="">Select course</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="flex items-center gap-4">
          <div className="w-32">
            <legend className="text-muted-foreground">TEE</legend>
          </div>

          <div className="flex flex-wrap gap-3">
            {!formData.course && (
              <p className="text-muted-foreground border border-transparent py-1">
                Awaiting course selection
              </p>
            )}
            {courseTeeOptions.map((teeOption) => {
              const isActive = formData.tee === teeOption.tee;
              return (
                <button
                  key={teeOption.tee}
                  type="button"
                  className={cn(
                    "rounded border px-3 py-1 text-sm",
                    isActive && "border-indigo-600 bg-indigo-500/30",
                  )}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      tee: teeOption.tee,
                      holesPlayed: null,
                      side: null,
                    }))
                  }
                  disabled={!formData.course}
                >
                  {teeOption.tee}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="flex items-center gap-4">
          <div className="w-32">
            <legend className="text-muted-foreground">HOLES PLAYED</legend>
          </div>

          <div className="flex flex-wrap gap-3">
            {!formData.course ? (
              <p className="text-muted-foreground border border-transparent py-1">
                Awaiting course selection
              </p>
            ) : (
              (
                [
                  { label: "18", holesPlayed: 18, side: null },
                  { label: "Front 9", holesPlayed: 9, side: "front" },
                  { label: "Back 9", holesPlayed: 9, side: "back" },
                ] satisfies {
                  label: string;
                  holesPlayed: RoundFormState["holesPlayed"];
                  side: RoundFormState["side"];
                }[]
              ).map((option) => {
                const isActive =
                  formData.holesPlayed === option.holesPlayed &&
                  formData.side === option.side;

                return (
                  <button
                    key={option.label}
                    type="button"
                    className={cn(
                      "rounded border px-3 py-1 text-sm",
                      isActive && "border-indigo-600 bg-indigo-500/30",
                    )}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        holesPlayed: option.holesPlayed,
                        side: option.side,
                      }))
                    }
                    disabled={!selectedTee}
                  >
                    {option.label}
                  </button>
                );
              })
            )}
          </div>
        </fieldset>

        <div className="flex items-center gap-4">
          <div className="w-32">
            <label
              htmlFor="handicap-index"
              className="text-muted-foreground whitespace-nowrap"
            >
              HANDICAP INDEX
            </label>
          </div>

          <div>
            <input
              id="handicap-index"
              type="number"
              step="0.1"
              value={formData.handicapIndex ?? ""}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  handicapIndex: event.target.value,
                }))
              }
              className="w-32 rounded border p-2"
              min="-10"
              max="54"
            />
          </div>
        </div>

        <label className="text-muted-foreground flex items-center gap-4">
          <span className="w-32">COMPETITION</span>
          <input
            type="checkbox"
            checked={Boolean(formData.isCompetition)}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                isCompetition: event.target.checked,
              }))
            }
            className="h-4 w-4"
          />
        </label>

        <div className="pl-36">
          <button
            type="submit"
            className={cn(
              "w-full rounded bg-indigo-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-indigo-700",
              "disabled:opacity-50 disabled:hover:bg-indigo-600",
            )}
            disabled={!canSubmit || isCreatingRound}
          >
            {isCreatingRound ? "Adding Round..." : "Add Round"}
          </button>
        </div>
      </form>

      <pre className="mx-auto w-full max-w-sm overflow-auto rounded border border-indigo-600/30 bg-indigo-500/10 p-4 text-xs">
        {JSON.stringify(previewData, null, 2)}
      </pre>
    </div>
  );
};
