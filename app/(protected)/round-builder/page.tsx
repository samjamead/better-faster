"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heading2 } from "@/components/typography/typography";
const GolfScoreCalculator = () => {
  const [upAndDownPercentage, setUpAndDownPercentage] = useState<number>(45);
  const [threePutts, setThreePutts] = useState<number>(0);
  const [penaltyShots, setPenaltyShots] = useState<number>(0);
  const [birdies, setBirdies] = useState<number>(0);
  const [doubleBogeys, setDoubleBogeys] = useState<number>(0);
  const [parThrees, setParThrees] = useState<number>(5);
  const [parThreeGreensHit, setParThreeGreensHit] = useState<number>(3);
  const [fairwayPercentage, setFairwayPercentage] = useState<number>(40);
  const [greenPercentage, setGreenPercentage] = useState<number>(75);
  const [goodLuck, setGoodLuck] = useState<boolean>(false);

  const [parThreeScore, setParThreeScore] = useState<number>(0);
  const [fairwayScore, setFairwayScore] = useState<number>(0);
  const [missedFairwayScore, setMissedFairwayScore] = useState<number>(0);
  const [otherScore, setOtherScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);

  const round = (num: number, isUp: boolean) => {
    return isUp ? Math.ceil(num) : Math.floor(num);
  };

  const calculateScore = useCallback(
    (isLucky: boolean) => {
      const parThreeMisses = parThrees - parThreeGreensHit;
      const parThreeUpAndDowns = round(
        (parThreeMisses * upAndDownPercentage) / 100,
        isLucky,
      );
      const parThreeTotal = parThreeMisses - parThreeUpAndDowns;

      const otherHoles = 18 - parThrees;
      const fairwaysHit = round(
        (otherHoles * fairwayPercentage) / 100,
        isLucky,
      );
      const fairwayMisses = otherHoles - fairwaysHit;

      const greensHitFromFairway = round(
        (fairwaysHit * greenPercentage) / 100,
        isLucky,
      );
      const fairwayGreenMisses = fairwaysHit - greensHitFromFairway;
      const fairwayGreenUpAndDowns = round(
        (fairwayGreenMisses * upAndDownPercentage) / 100,
        isLucky,
      );
      const fairwayTotal = fairwayGreenMisses - fairwayGreenUpAndDowns;

      const missedFairwayUpAndDowns = round(
        (fairwayMisses * upAndDownPercentage) / 100,
        isLucky,
      );
      const missedFairwayTotal = fairwayMisses - missedFairwayUpAndDowns;

      const otherFactors = threePutts + penaltyShots + doubleBogeys - birdies;

      return {
        parThreeScore: parThreeTotal,
        fairwayScore: fairwayTotal,
        missedFairwayScore: missedFairwayTotal,
        otherScore: otherFactors,
        totalScore:
          parThreeTotal + fairwayTotal + missedFairwayTotal + otherFactors,
      };
    },
    [
      parThrees,
      parThreeGreensHit,
      upAndDownPercentage,
      fairwayPercentage,
      greenPercentage,
      threePutts,
      penaltyShots,
      birdies,
      doubleBogeys,
    ],
  );

  useEffect(() => {
    const scores = calculateScore(goodLuck);
    setParThreeScore(scores.parThreeScore);
    setFairwayScore(scores.fairwayScore);
    setMissedFairwayScore(scores.missedFairwayScore);
    setOtherScore(scores.otherScore);
    setTotalScore(scores.totalScore);
  }, [calculateScore, goodLuck]);

  return (
    <div className="space-y-8">
      <Heading2>Round Builder</Heading2>
      <Card className="bg-foreground/10 p-6 shadow-lg backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="space-y-2">
            <Label htmlFor="upAndDown" className="text-sm font-medium">
              Up and Down %
            </Label>
            <Input
              id="upAndDown"
              type="number"
              min="0"
              max="100"
              value={upAndDownPercentage}
              onChange={(e) => setUpAndDownPercentage(Number(e.target.value))}
              className="hover:border-sage focus:border-sage transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="threePutts" className="text-sm font-medium">
              Three Putts
            </Label>
            <Input
              id="threePutts"
              type="number"
              min="0"
              value={threePutts}
              onChange={(e) => setThreePutts(Number(e.target.value))}
              className="hover:border-sage focus:border-sage transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="penalties" className="text-sm font-medium">
              Penalty Shots
            </Label>
            <Input
              id="penalties"
              type="number"
              min="0"
              value={penaltyShots}
              onChange={(e) => setPenaltyShots(Number(e.target.value))}
              className="hover:border-sage focus:border-sage transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birdies" className="text-sm font-medium">
              Birdies
            </Label>
            <Input
              id="birdies"
              type="number"
              min="0"
              value={birdies}
              onChange={(e) => setBirdies(Number(e.target.value))}
              className="hover:border-sage focus:border-sage transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doubleBogeys" className="text-sm font-medium">
              Double Bogeys
            </Label>
            <Input
              id="doubleBogeys"
              type="number"
              min="0"
              value={doubleBogeys}
              onChange={(e) => setDoubleBogeys(Number(e.target.value))}
              className="hover:border-sage focus:border-sage transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="goodLuck" className="text-sm font-medium">
                Having a Good Day?
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      When having a good day, calculations round up for positive
                      outcomes (up and downs, fairways hit, greens hit). When
                      having a bad day, they round down.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="pl-3 pt-3">
              <Switch
                id="goodLuck"
                checked={goodLuck}
                onCheckedChange={setGoodLuck}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
        <Card className="bg-foreground/10 p-6 shadow-lg backdrop-blur-sm">
          <div className="prose prose-sm max-w-none space-y-4">
            <div className="space-y-4">
              <p className="text-charcoal leading-relaxed">
                If there are{" "}
                <Input
                  type="number"
                  min="0"
                  max="18"
                  value={parThrees}
                  onChange={(e) => setParThrees(Number(e.target.value))}
                  className="mx-1 inline-block w-16"
                />{" "}
                par threes and you hit the green on{" "}
                <span className="mx-1 inline-block w-48">
                  <Slider
                    min={0}
                    max={parThrees}
                    step={1}
                    value={[parThreeGreensHit]}
                    onValueChange={(value) => setParThreeGreensHit(value[0])}
                  />
                </span>{" "}
                of them, with a {upAndDownPercentage}% up and down rate,
                you&apos;ll play them in {parThreeScore} over par.
              </p>

              <p className="text-charcoal leading-relaxed">
                That leaves {18 - parThrees} par fours and fives. A fairways hit
                percentage of{" "}
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={fairwayPercentage}
                  onChange={(e) => setFairwayPercentage(Number(e.target.value))}
                  className="mx-1 inline-block w-16"
                />
                % means you&apos;ll hit{" "}
                {Math.round(((18 - parThrees) * fairwayPercentage) / 100)}{" "}
                fairways. Assuming you hit{" "}
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={greenPercentage}
                  onChange={(e) => setGreenPercentage(Number(e.target.value))}
                  className="mx-1 inline-block w-16"
                />
                % of greens in regulation when you&apos;re in the fairway,
                you&apos;ll play these holes in {fairwayScore} over par.
              </p>

              <p className="text-charcoal leading-relaxed">
                You&apos;ll miss the fairway on{" "}
                {Math.round(
                  ((18 - parThrees) * (100 - fairwayPercentage)) / 100,
                )}{" "}
                holes. Assuming you also miss the green when you miss the
                fairway, your up and down rate of {upAndDownPercentage}% means
                you&apos;ll play these holes in {missedFairwayScore} over par.
              </p>

              <p className="text-charcoal leading-relaxed">
                Your {threePutts} three putts, {penaltyShots} penalty shots,{" "}
                {doubleBogeys} double bogeys, and {birdies} birdies combine for{" "}
                {otherScore} additional strokes.
              </p>

              <p className="mt-4 text-right text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                Predicted score: {totalScore} over par
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-foreground/10 p-6 shadow-lg backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-center">Holes</th>
                  <th className="p-2 text-center">Good Day</th>
                  <th className="p-2 text-center">Bad Day</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Par 3 Performance</td>
                  <td className="text-center">{parThrees}</td>
                  <td className="text-center font-semibold text-emerald-700 dark:text-emerald-300">
                    {calculateScore(true).parThreeScore > 0 ? "+" : ""}
                    {calculateScore(true).parThreeScore}
                  </td>
                  <td className="text-center font-semibold text-rose-600 dark:text-rose-300">
                    {calculateScore(false).parThreeScore > 0 ? "+" : ""}
                    {calculateScore(false).parThreeScore}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Par 4/5s (From Fairway)</td>
                  <td className="text-center">
                    {Math.round(((18 - parThrees) * fairwayPercentage) / 100)}
                  </td>
                  <td className="text-center font-semibold text-emerald-700 dark:text-emerald-300">
                    {calculateScore(true).fairwayScore > 0 ? "+" : ""}
                    {calculateScore(true).fairwayScore}
                  </td>
                  <td className="text-center font-semibold text-rose-600 dark:text-rose-300">
                    {calculateScore(false).fairwayScore > 0 ? "+" : ""}
                    {calculateScore(false).fairwayScore}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Par 4/5s (Missed Fairway)</td>
                  <td className="text-center">
                    {18 -
                      parThrees -
                      Math.round(((18 - parThrees) * fairwayPercentage) / 100)}
                  </td>
                  <td className="text-center font-semibold text-emerald-700 dark:text-emerald-300">
                    {calculateScore(true).missedFairwayScore > 0 ? "+" : ""}
                    {calculateScore(true).missedFairwayScore}
                  </td>
                  <td className="text-center font-semibold text-rose-600 dark:text-rose-300">
                    {calculateScore(false).missedFairwayScore > 0 ? "+" : ""}
                    {calculateScore(false).missedFairwayScore}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Other factors</td>
                  <td className="text-center">-</td>
                  <td className="text-center font-semibold text-emerald-700 dark:text-emerald-300">
                    {calculateScore(true).otherScore > 0 ? "+" : ""}
                    {calculateScore(true).otherScore}
                  </td>
                  <td className="text-center font-semibold text-rose-600 dark:text-rose-300">
                    {calculateScore(false).otherScore > 0 ? "+" : ""}
                    {calculateScore(false).otherScore}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t font-semibold">
                  <td className="p-2">Total</td>
                  <td className="text-center">18</td>
                  <td className="text-center text-emerald-700 dark:text-emerald-300">
                    {calculateScore(true).totalScore > 0 ? "+" : ""}
                    {calculateScore(true).totalScore}
                  </td>
                  <td className="text-center text-rose-600 dark:text-rose-400">
                    {calculateScore(false).totalScore > 0 ? "+" : ""}
                    {calculateScore(false).totalScore}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GolfScoreCalculator;
