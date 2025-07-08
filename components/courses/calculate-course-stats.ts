import { Round } from "@/types/round";

export default function CalculateCourseStats(rounds: Round[]) {
  const courseStats = rounds.reduce((acc, round) => {
    const existing = acc.get(round.course);

    if (existing) {
      existing.totalRounds++;
      existing.totalHoles += round.holes_played;
    } else {
      acc.set(round.course, {
        course: round.course,
        totalRounds: 1,
        totalHoles: round.holes_played,
      });
    }

    return acc;
  }, new Map<string, { course: string; totalRounds: number; totalHoles: number }>());

  return Array.from(courseStats.values()).sort((a, b) =>
    b.course.localeCompare(a.course),
  );
}
