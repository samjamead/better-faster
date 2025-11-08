"use client";

import { useState } from "react";
import coursesData from "@/data/courses.json";
import { calculateCourseHandicap } from "@/lib/calculate-course-handicap";

const findCourseData = (courseId: string, tee: string) =>
  coursesData.courseRatings.find(
    (c) => c.courseId === courseId && c.teeId === tee,
  );

export default function LogRound() {
  const [userInputs, setUserInputs] = useState<{
    [key: string]: string | number | null;
  }>({
    courseId: "c1",
    tee: "c1tW",
    handicapIndex: null,
  });

  const [courseHandicap, setCourseHandicap] = useState<number | null>(null);

  const [courseData, setCourseData] = useState(
    findCourseData(userInputs.courseId as string, userInputs.tee as string),
  );

  const holes = coursesData.holes.filter(
    (h) => h.courseId === userInputs.courseId,
  );

  const scorecard = coursesData.holeDetails
    .filter(
      (h) => h.courseId === userInputs.courseId && h.teeId === userInputs.tee,
    )
    .map((h) => {
      const hole = holes.find((hole) => hole.id === h.holeId);
      return {
        ...h,
        id: hole?.id ?? "",
        number: hole?.number ?? 0,
      };
    });

  const updateUserInputs = (key: string, value: string | number | null) => {
    const newInputs = { ...userInputs, [key]: value };
    setUserInputs(newInputs);
    setCourseData(
      findCourseData(newInputs.courseId as string, newInputs.tee as string),
    );
  };

  // Calculate course handicap when all required values are present
  const shouldCalculateHandicap =
    userInputs.courseId &&
    userInputs.tee &&
    userInputs.handicapIndex &&
    typeof userInputs.handicapIndex === "number" &&
    userInputs.handicapIndex > 0;

  if (shouldCalculateHandicap) {
    const newCourseHandicap = calculateCourseHandicap({
      handicapIndex: userInputs.handicapIndex as number,
      courseRating: courseData?.courseRating ?? 72,
      slopeRating: courseData?.slopeRating ?? 113,
      par: courseData?.par ?? 72,
    });

    if (courseHandicap !== newCourseHandicap) {
      setCourseHandicap(newCourseHandicap);
    }
  }

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourseId = e.target.value;

    // Reset tee selection when course changes
    const availableTees = coursesData.tees.filter(
      (tee) => tee.courseId === newCourseId,
    );
    const newTeeId = availableTees.length > 0 ? availableTees[0].id : "";

    setCourseData;

    setUserInputs((prev) => ({
      ...prev,
      courseId: newCourseId,
      tee: newTeeId,
    }));
  };

  const handleTeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUserInputs("tee", e.target.value);
  };

  const handleHandicapIndexChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserInputs("handicapIndex", parseFloat(e.target.value || "0"));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Log Round</h1>

      <div className="flex items-center gap-4">
        <div>
          <select
            className="border-foreground/25 rounded-md border px-2 py-1"
            value={userInputs.courseId ?? ""}
            onChange={handleCourseChange}
          >
            {coursesData.courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="border-foreground/25 rounded-md border px-2 py-1"
            value={userInputs.tee ?? ""}
            onChange={handleTeeChange}
          >
            {coursesData.tees
              .filter((tee) => tee.courseId === userInputs.courseId)
              .map((tee) => (
                <option key={tee.id} value={tee.id}>
                  {tee.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <input
            type="number"
            className="border-foreground/25 max-w-48 rounded-md border px-2 py-1"
            placeholder="Handicap index"
            onChange={handleHandicapIndexChange}
          />
        </div>

        <div>
          <p>Course handicap: {courseHandicap}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="border-foreground/25 border text-sm">
          <thead className="font-medium">
            <tr>
              <th className="border-foreground/25 border px-2 py-1 text-left">
                Hole
              </th>
              <th className="border-foreground/25 border px-2 py-1 text-center">
                Yards
              </th>
              <th className="border-foreground/25 border px-2 py-1 text-center">
                Par
              </th>
              <th className="border-foreground/25 border px-2 py-1 text-center">
                SI
              </th>
              <th className="border-foreground/25 border px-2 py-1 text-center">
                Shot?
              </th>
            </tr>
          </thead>
          <tbody>
            {scorecard.map((hole) => {
              return (
                <tr key={hole.id} className="hover:bg-sky-500/10">
                  <td className="border-foreground/25 border px-2 py-1 font-medium">
                    {hole.number}
                  </td>
                  <td className="border-foreground/25 border px-2 py-1 text-center">
                    {hole.yards}
                  </td>
                  <td className="border-foreground/25 border px-2 py-1 text-center">
                    {hole.par}
                  </td>
                  <td className="border-foreground/25 border px-2 py-1 text-center">
                    {hole.strokeIndex}
                  </td>
                  <td className="border-foreground/25 border px-2 py-1 text-center">
                    {courseHandicap && hole.strokeIndex <= courseHandicap
                      ? "✅"
                      : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
