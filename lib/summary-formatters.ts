import type { AttemptsSummary } from "@/types/round-summary";

export const formatToPar = (value: number) =>
  value > 0 ? `+${value}` : value.toString();

export const formatAttempts = ({ made, attempts }: AttemptsSummary) =>
  attempts === 0 ? "—" : `${made}/${attempts}`;

export const formatPercent = ({ percent, attempts }: AttemptsSummary) =>
  attempts === 0 ? "—" : `${percent}%`;

export const formatMissValue = (value: string | null) => {
  if (!value) return value;
  return value.length < 3
    ? value.toUpperCase()
    : value.charAt(0).toUpperCase() + value.slice(1);
};
