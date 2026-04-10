import { WideHoleData } from "@/types/wide-hole-data";

export function computeHoleGrid(data: WideHoleData[]) {
  const holeNumbers = [...new Set(data.map((d) => d.hole_number))].sort(
    (a, b) => a - b,
  );

  const holePars = new Map<number, number>();
  data.forEach((row) => {
    if (!holePars.has(row.hole_number)) {
      holePars.set(row.hole_number, row.par);
    }
  });

  const totalPar = holeNumbers.reduce(
    (sum, n) => sum + (holePars.get(n) ?? 0),
    0,
  );

  return { holeNumbers, holePars, totalPar };
}
