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
import { Minus, Plus } from "lucide-react";
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

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  unit?: string;
};

function Counter({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  label,
  unit,
}: CounterProps) {
  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">
          <span className="text-lg font-medium">{value}</span>
          {unit && <span className="ml-1 text-muted-foreground">{unit}</span>}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

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
  });
  const [puttData, setPuttData] = useState({
    proximity: 0,
    putts: 1,
    good_line: false,
    good_speed: false,
    good_read: false,
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

      // Update running stats
      setTestStats((prev) => ({
        totalStrokesGained: prev.totalStrokesGained + strokesGained,
        goodLineCount: prev.goodLineCount + (puttData.good_line ? 1 : 0),
        goodSpeedCount: prev.goodSpeedCount + (puttData.good_speed ? 1 : 0),
        goodReadCount: prev.goodReadCount + (puttData.good_read ? 1 : 0),
        puttsHoled: prev.puttsHoled + (puttData.putts === 1 ? 1 : 0),
      }));

      // Reset form for next putt
      setPuttData({
        proximity: 0,
        putts: 1,
        good_line: false,
        good_speed: false,
        good_read: false,
      });

      if (remainingDistances.length > 0) {
        setCurrentDistance(remainingDistances[0]);
        setRemainingDistances(remainingDistances.slice(1));
      } else {
        // Update test with final stats
        await upsertPuttingTest({
          id: testId,
          golfer_id: golfer.id,
          test_date: new Date().toISOString().split("T")[0],
          strokes_gained_putting: testStats.totalStrokesGained,
          good_line_percentage: (testStats.goodLineCount / 10) * 100,
          good_speed_percentage: (testStats.goodSpeedCount / 10) * 100,
          good_read_percentage: (testStats.goodReadCount / 10) * 100,
        });
        setStep("complete");
      }
    } catch (error) {
      console.error("Failed to log putt:", error);
    }
  };

  if (step === "intro") {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Heading2>Putting Test</Heading2>
          <p className="text-muted-foreground">
            Test your putting skills with 10 putts at different distances. Each
            putt will be from a random distance between 3 and 30 feet.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold">Instructions:</h3>
            <ol className="list-decimal space-y-2 pl-4">
              <li>Set up your putt at the indicated distance</li>
              <li>Read the line and make your practice strokes</li>
              <li>Hit your putt and putt out if you miss</li>
              <li>Record the results honestly</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={startTest}>Start Test</Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === "putting") {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Heading2>{currentDistance} Foot Putt</Heading2>
          <p className="text-muted-foreground">
            Putt {11 - remainingDistances.length} of 10
          </p>
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

            {puttData.putts > 1 && (
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
            )}

            <div className="space-y-4">
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
        <CardFooter>
          <Button onClick={nextPutt}>Next Putt</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <Heading2>Test Complete!</Heading2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Great job completing your putting test. Here are your results:</p>

          <div className="grid gap-4 rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-muted-foreground">One-Putts</p>
              <p className="text-right font-medium">
                {testStats.puttsHoled} / 10
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
      <CardFooter>
        <Button onClick={() => window.location.reload()}>Start New Test</Button>
      </CardFooter>
    </Card>
  );
}
