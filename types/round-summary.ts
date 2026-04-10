export type AttemptsSummary = {
  made: number;
  attempts: number;
  percent: number;
};

export type PercentageSummary = AttemptsSummary;

export type RoundSummary = {
  roundId: number;
  date: string;
  course: string;
  tee: string;
  holesPlayed: number;
  side: string;
  handicap: number;
  gross: number;
  par: number;
  toPar: number;
  stableford: number;
  fairways: AttemptsSummary;
  gir: AttemptsSummary;
  upDown: AttemptsSummary;
  putts: number;
};

export type HoleSummary = {
  id: number;
  holeNumber: number;
  par: number;
  yards: number;
  strokeIndex: number;
  shotsGiven: number | null;
  gross: number | null;
  toPar: number | null;
  net: number | null;
  stableford: number | null;
  cumulativeToPar: number | null;
  putts: number | null;
};

export type RoundDetails = {
  summary: RoundSummary;
  holes: HoleSummary[];
};
