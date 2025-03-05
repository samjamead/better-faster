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
import { upsertPuttingTest, logPuttingTestData } from "./actions";

type WizardStep = "intro" | "putting" | "complete";

const DISTANCES = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];

// Strokes gained lookup table
const SGP_VALUES: Record<number, number> = {
  3: 1.053,
  6: 1.375,
  9: 1.575,
  12: 1.705,
  15: 1.79,
  18: 1.848,
  21: 1.891,
  24: 1.925,
  27: 1.953,
  30: 1.978,
};

// Calculate strokes gained for a single putt
const calculateStrokesGained = (distance: number, totalPutts: number) => {
  const startingStrokesGained = SGP_VALUES[distance] || 0;

  if (totalPutts === 1) {
    return startingStrokesGained - 1; // Made in one putt
  } else if (totalPutts > 1) {
    return startingStrokesGained - totalPutts; // Subtract actual number of putts taken
  }

  return 0;
};

export default function PuttingTestForm({ golfer }: { golfer: Golfer }) {
  const [step, setStep] = useState<WizardStep>("intro");
  const [testId, setTestId] = useState<number | null>(null);
  const [remainingDistances, setRemainingDistances] = useState<number[]>([]);
  const [currentDistance, setCurrentDistance] = useState<number | null>(null);
  const [testStats, setTestStats] = useState({
    totalStrokesGained: 0,
    goodLineCount: 0,
    goodSpeedCount: 0,
    goodReadCount: 0,
    puttsHoled: 0,
    totalProximity: 0,
    totalMissedPutts: 0,
  });
  const [puttData, setPuttData] = useState({
    proximity: 0,
    putts: 1,
    good_line: true,
    good_speed: true,
    good_read: true,
  });

  const startTest = async () => {
    try {
      const test = await upsertPuttingTest({
        golfer_id: golfer.id,
        test_date: new Date().toISOString().split("T")[0],
      });
      setTestId(test.id);
      const shuffledDistances = [...DISTANCES].sort(() => Math.random() - 0.5);
      setRemainingDistances(shuffledDistances.slice(1));
      setCurrentDistance(shuffledDistances[0]);
      setTestStats({
        totalStrokesGained: 0,
        goodLineCount: 0,
        goodSpeedCount: 0,
        goodReadCount: 0,
        puttsHoled: 0,
        totalProximity: 0,
        totalMissedPutts: 0,
      });
      setStep("putting");
    } catch (error) {
      console.error("Failed to start test:", error);
    }
  };

  const nextPutt = async () => {
    if (!testId || !currentDistance) return;

    const strokesGained = calculateStrokesGained(
      currentDistance,
      puttData.putts,
    );

    try {
      await logPuttingTestData({
        test_id: testId,
        golfer_id: golfer.id,
        distance: currentDistance,
        score: puttData.putts,
        strokes_gained_putting: strokesGained,
        ...puttData,
      });

      // Reset form for next putt
      setPuttData({
        proximity: 0,
        putts: 1,
        good_line: true,
        good_speed: true,
        good_read: true,
      });

      if (remainingDistances.length > 0) {
        // Update running stats
        const isMissed = puttData.putts > 1;
        const newTotalMissedPutts =
          testStats.totalMissedPutts + (isMissed ? 1 : 0);
        const newTotalProximity =
          testStats.totalProximity + (isMissed ? puttData.proximity : 0);

        const updatedStats = {
          totalStrokesGained: testStats.totalStrokesGained + strokesGained,
          goodLineCount: testStats.goodLineCount + (puttData.good_line ? 1 : 0),
          goodSpeedCount:
            testStats.goodSpeedCount + (puttData.good_speed ? 1 : 0),
          goodReadCount: testStats.goodReadCount + (puttData.good_read ? 1 : 0),
          puttsHoled: testStats.puttsHoled + (puttData.putts === 1 ? 1 : 0),
          totalProximity: newTotalProximity,
          totalMissedPutts: newTotalMissedPutts,
        };
        setTestStats(updatedStats);

        setCurrentDistance(remainingDistances[0]);
        setRemainingDistances(remainingDistances.slice(1));
      } else {
        // Test complete, update summary stats
        const isMissed = puttData.putts > 1;
        const newTotalMissedPutts =
          testStats.totalMissedPutts + (isMissed ? 1 : 0);
        const newTotalProximity =
          testStats.totalProximity + (isMissed ? puttData.proximity : 0);

        const updatedStats = {
          totalStrokesGained: testStats.totalStrokesGained + strokesGained,
          goodLineCount: testStats.goodLineCount + (puttData.good_line ? 1 : 0),
          goodSpeedCount:
            testStats.goodSpeedCount + (puttData.good_speed ? 1 : 0),
          goodReadCount: testStats.goodReadCount + (puttData.good_read ? 1 : 0),
          puttsHoled: testStats.puttsHoled + (puttData.putts === 1 ? 1 : 0),
          totalProximity: newTotalProximity,
          totalMissedPutts: newTotalMissedPutts,
        };

        const averageProximity =
          updatedStats.totalMissedPutts > 0
            ? Number(
                (
                  updatedStats.totalProximity / updatedStats.totalMissedPutts
                ).toFixed(1),
              )
            : 0;

        await upsertPuttingTest({
          id: testId,
          golfer_id: golfer.id,
          test_date: new Date().toISOString().split("T")[0],
          strokes_gained_putting: updatedStats.totalStrokesGained,
          average_proximity: averageProximity,
          good_line_percentage: Number(
            (updatedStats.goodLineCount / 10).toFixed(3),
          ),
          good_speed_percentage: Number(
            (updatedStats.goodSpeedCount / 10).toFixed(3),
          ),
          good_read_percentage: Number(
            (updatedStats.goodReadCount / 10).toFixed(3),
          ),
        });
        setStep("complete");
      }
    } catch (error) {
      console.error("Failed to log putt:", error);
    }
  };

  if (step === "intro") {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Heading2>Putting Test</Heading2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              You&apos;re going to putt to 10 different holes. You&apos;ll be
              given the distance for each hole.
            </p>
            <p>
              Try to vary the break, and whether the putt is uphill or downhill.
            </p>
            <p>
              For each hole location, record the number of putts, proximity of
              your first putt, and whether you hit a good line, speed, and read.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={startTest}>Start Putting Test</Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === "putting") {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <p className="text-muted-foreground">
            Putt {10 - remainingDistances.length} of 10
          </p>
          <Heading2>{currentDistance} feet</Heading2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Counter
              label="Number of Putts"
              value={puttData.putts}
              onChange={(value) => setPuttData({ ...puttData, putts: value })}
              min={1}
              max={4}
            />

            <Counter
              label="First Putt Proximity"
              value={puttData.proximity}
              onChange={(value) =>
                setPuttData({ ...puttData, proximity: value })
              }
              min={0}
              max={10}
              step={0.5}
              unit="feet"
            />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="good_read">Good Read</Label>
                <Switch
                  id="good_read"
                  checked={puttData.good_read}
                  onCheckedChange={(checked) =>
                    setPuttData({ ...puttData, good_read: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="good_line">Good Line</Label>
                <Switch
                  id="good_line"
                  checked={puttData.good_line}
                  onCheckedChange={(checked) =>
                    setPuttData({ ...puttData, good_line: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="good_speed">Good Speed</Label>
                <Switch
                  id="good_speed"
                  checked={puttData.good_speed}
                  onCheckedChange={(checked) =>
                    setPuttData({ ...puttData, good_speed: checked })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Button onClick={nextPutt}>Next Putt</Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === "complete") {
    const averageProximity =
      testStats.totalMissedPutts > 0
        ? (testStats.totalProximity / testStats.totalMissedPutts).toFixed(1)
        : "0.0";

    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Heading2>Test Complete</Heading2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 rounded-lg border p-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">One Putts</p>
                <p className="text-right font-medium">
                  {testStats.puttsHoled} / 10
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">Average Proximity</p>
                <p className="text-right font-medium">
                  {averageProximity} feet
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">Strokes Gained</p>
                <p className="text-right font-medium">
                  {testStats.totalStrokesGained.toFixed(3)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">Good Reads</p>
                <p className="text-right font-medium">
                  {testStats.goodReadCount} / 10
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">Good Lines</p>
                <p className="text-right font-medium">
                  {testStats.goodLineCount} / 10
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <p className="text-muted-foreground">Good Speed</p>
                <p className="text-right font-medium">
                  {testStats.goodSpeedCount} / 10
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Button onClick={() => window.location.reload()}>
            Start New Test
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
