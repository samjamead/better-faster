export interface PercentageStat {
  key: string | number;
  value: number;
  percentage: number;
}

export interface ChippingClubStat {
  club: string;
  attempts: number;
  successes: number;
  percentage: number;
}

export interface ChippingSummary {
  clubs: ChippingClubStat[];
  totalAttempts: number;
  totalSuccesses: number;
  overallPercentage: number;
}

export interface HistogramBucket {
  key: string | number;
  count: number;
  percentage: number;
}

export interface PuttsBucket extends HistogramBucket {
  key: number;
  isGoodPutting: boolean;
}

export interface PuttsSummary {
  totalHoles: number;
  maxCount: number;
  averagePutts: number;
  buckets: PuttsBucket[];
}

export interface ScoreToParBucket extends HistogramBucket {
  key: number;
  label?: string;
}

export interface ScoreToParSummary {
  totalHoles: number;
  maxCount: number;
  buckets: ScoreToParBucket[];
}
