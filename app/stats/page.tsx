import { DisplayFilters } from "@/components/display-filters";
import { ApproachAccuracy } from "@/components/summaries/approach-accuracy";
import { ApproachGrid } from "@/components/summaries/approach-grid";
import { Chipping } from "@/components/summaries/chipping";
import { DrivingAccuracy } from "@/components/summaries/driving-accuracy";
import { FairwaysGrid } from "@/components/summaries/fairways-grid";
import { OverallStats } from "@/components/summaries/overall-stats";
import { PuttsPerHole } from "@/components/summaries/putts-per-hole";
import { ScorePerHole } from "@/components/summaries/score-per-hole";
import { ScoreToPar } from "@/components/summaries/score-to-par";
import { Card } from "@/components/ui/card";

export default function ProtectedPage() {
  return (
    <div className="w-full space-y-8 py-8">
      <div className="flex items-center gap-12">
        <p className="tracking-wider uppercase">Summary Stats</p>
        <DisplayFilters />
      </div>

      <div className="grid grid-cols-4 gap-3">
        <OverallStats />
        <ScoreToPar />
        <ScorePerHole />
        <PuttsPerHole />
        <FairwaysGrid />
        <DrivingAccuracy />
        <ApproachGrid />

        <div className="row-span-2">
          <ApproachAccuracy />
        </div>
        <Chipping />
        <Card heading="Short game">
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-emerald-600/20">
            <p>Scrambling</p>
            <p>Up and down</p>
          </div>
        </Card>
        <Card heading="Coming">
          <div className="flex min-h-32 items-center justify-center bg-indigo-600/20">
            <p>soon</p>
          </div>
        </Card>
        <Card heading="Better">
          <div className="flex min-h-32 items-center justify-center bg-indigo-600/20">
            <p>Faster</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
