"use client";

import { useState } from "react";
import { Heading2 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Counter } from "@/components/ui/counter";
import { Golfer } from "@/lib/types";
import { upsertWedgeTest, logWedgeTestData } from "./actions";

type WizardStep = "intro" | "wedge" | "complete";

const DISTANCES = [10, 15, 20];
const TRAJECTORIES = ["low", "mid", "high"] as const;

type Trajectory = (typeof TRAJECTORIES)[number];

type ShotData = {
  proximity_feet: number;
  landing_spot_hit: boolean;
  desired_trajectory_hit: boolean;
  quality_contact: boolean;
};

type Shot = {
  distance: number;
  trajectory: Trajectory;
};

export default function WedgeTestForm({ golfer }: { golfer: Golfer }) {
  const [step, setStep] = useState<WizardStep>("intro");
  const [testId, setTestId] = useState<number | null>(null);
  const [currentShot, setCurrentShot] = useState<Shot | null>(null);
  const [remainingShots, setRemainingShots] = useState<Shot[]>([]);
  const [testStats, setTestStats] = useState({
    totalProximity: 0,
    landingSpotCount: 0,
    trajectoryCount: 0,
    qualityContactCount: 0,
    shotsHit: 0,
  });
  const [shotData, setShotData] = useState<ShotData>({
    proximity_feet: 5,
    landing_spot_hit: true,
    desired_trajectory_hit: true,
    quality_contact: true,
  });

  const startTest = async () => {
    try {
      const test = await upsertWedgeTest({
        golfer_id: golfer.id,
        test_date: new Date().toISOString().split("T")[0],
      });
      setTestId(test.id);

      // Generate all possible combinations
      const allShots: Shot[] = [];
      DISTANCES.forEach((distance) => {
        TRAJECTORIES.forEach((trajectory) => {
          allShots.push({ distance, trajectory });
        });
      });

      // Shuffle all combinations
      const shuffledShots = [...allShots].sort(() => Math.random() - 0.5);
      setRemainingShots(shuffledShots.slice(1));
      setCurrentShot(shuffledShots[0]);

      setTestStats({
        totalProximity: 0,
        landingSpotCount: 0,
        trajectoryCount: 0,
        qualityContactCount: 0,
        shotsHit: 0,
      });
      setStep("wedge");
    } catch (error) {
      console.error("Failed to start test:", error);
    }
  };

  const nextShot = async () => {
    if (!testId || !currentShot) return;

    try {
      await logWedgeTestData({
        wedge_test_id: testId,
        golfer_id: golfer.id,
        target_distance_yards: currentShot.distance,
        target_flight: currentShot.trajectory,
        ...shotData,
      });

      // Reset form for next shot
      setShotData({
        proximity_feet: 5,
        landing_spot_hit: true,
        desired_trajectory_hit: true,
        quality_contact: true,
      });

      if (remainingShots.length > 0) {
        // Update running stats
        const updatedStats = {
          totalProximity: testStats.totalProximity + shotData.proximity_feet,
          landingSpotCount:
            testStats.landingSpotCount + (shotData.landing_spot_hit ? 1 : 0),
          trajectoryCount:
            testStats.trajectoryCount +
            (shotData.desired_trajectory_hit ? 1 : 0),
          qualityContactCount:
            testStats.qualityContactCount + (shotData.quality_contact ? 1 : 0),
          shotsHit: testStats.shotsHit + 1,
        };
        setTestStats(updatedStats);

        setCurrentShot(remainingShots[0]);
        setRemainingShots(remainingShots.slice(1));
      } else {
        // Test complete, update summary stats
        const updatedStats = {
          totalProximity: testStats.totalProximity + shotData.proximity_feet,
          landingSpotCount:
            testStats.landingSpotCount + (shotData.landing_spot_hit ? 1 : 0),
          trajectoryCount:
            testStats.trajectoryCount +
            (shotData.desired_trajectory_hit ? 1 : 0),
          qualityContactCount:
            testStats.qualityContactCount + (shotData.quality_contact ? 1 : 0),
          shotsHit: 9, // Keep at 9 for the final shot
        };

        const averageProximity = Number(
          (updatedStats.totalProximity / 9).toFixed(1),
        );
        const landingSpotPercentage = Number(
          (updatedStats.landingSpotCount / 9).toFixed(3),
        );
        const trajectoryPercentage = Number(
          (updatedStats.trajectoryCount / 9).toFixed(3),
        );
        const qualityContactPercentage = Number(
          (updatedStats.qualityContactCount / 9).toFixed(3),
        );

        await upsertWedgeTest({
          id: testId,
          golfer_id: golfer.id,
          test_date: new Date().toISOString().split("T")[0],
          shots_hit: 9,
          total_proximity: updatedStats.totalProximity,
          average_proximity: averageProximity,
          landing_spot_percentage: landingSpotPercentage,
          trajectory_percentage: trajectoryPercentage,
          quality_contact_percentage: qualityContactPercentage,
        });
        setStep("complete");
      }
    } catch (error) {
      console.error("Failed to log shot:", error);
    }
  };

  if (step === "intro") {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Heading2>Wedge Test</Heading2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              You&apos;re going to hit 9 wedge shots. You&apos;ll hit low, mid,
              and high shots to three different distances.
            </p>
            <p>
              For each shot, record your proximity, whether you hit the landing
              spot, whether you hit the desired trajectory, and whether you got
              quality contact.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={startTest}>Start Wedge Test</Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === "wedge") {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <p className="text-muted-foreground">
            Shot {testStats.shotsHit + 1} of 9
          </p>
          <Heading2>
            {currentShot?.distance} yards - {currentShot?.trajectory} trajectory
          </Heading2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Counter
              label="Proximity"
              value={shotData.proximity_feet}
              onChange={(value) =>
                setShotData({ ...shotData, proximity_feet: value })
              }
              min={0}
              max={20}
              step={1}
              unit="feet"
            />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="landing_spot">Landing Spot</Label>
                <Switch
                  id="landing_spot"
                  checked={shotData.landing_spot_hit}
                  onCheckedChange={(checked) =>
                    setShotData({ ...shotData, landing_spot_hit: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="trajectory">Desired Trajectory</Label>
                <Switch
                  id="trajectory"
                  checked={shotData.desired_trajectory_hit}
                  onCheckedChange={(checked) =>
                    setShotData({
                      ...shotData,
                      desired_trajectory_hit: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="quality_contact">Quality Contact</Label>
                <Switch
                  id="quality_contact"
                  checked={shotData.quality_contact}
                  onCheckedChange={(checked) =>
                    setShotData({ ...shotData, quality_contact: checked })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Button onClick={nextShot}>Next Shot</Button>
        </CardFooter>
      </Card>
    );
  }

  const averageProximity = (
    testStats.totalProximity / testStats.shotsHit
  ).toFixed(1);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <Heading2>Test Complete</Heading2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-muted-foreground">Average Proximity</p>
              <p className="text-right font-medium">{averageProximity} feet</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-muted-foreground">Landing Spot</p>
              <p className="text-right font-medium">
                {testStats.landingSpotCount} / 9
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-muted-foreground">Desired Trajectory</p>
              <p className="text-right font-medium">
                {testStats.trajectoryCount} / 9
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-muted-foreground">Quality Contact</p>
              <p className="text-right font-medium">
                {testStats.qualityContactCount} / 9
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
        <Button onClick={() => window.location.reload()}>Start New Test</Button>
      </CardFooter>
    </Card>
  );
}
