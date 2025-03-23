"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Golfer } from "@/lib/types";
import { upsertRound } from "./actions";

type TeeColor = "red" | "yellow" | "white" | "blue";
type Side = "front" | "back";

export default function RoundForm({ golfer }: { golfer: Golfer }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    course: "",
    tee: "yellow" as TeeColor,
    holes_played: 18,
    side: null as Side | null,
    par: 72,
    gross: null as number | null,
    stableford: null as number | null,
    handicap_index: null as number | null,
    playing_handicap: null as number | null,
    fairways_hit: null as number | null,
    greens_in_regulation: null as number | null,
    up_and_down: null as number | null,
    putts: null as number | null,
    penalty_strokes: null as number | null,
    birdies: null as number | null,
    double_bogeys: null as number | null,
    three_putts: null as number | null,
    greens_on_par_three: null as number | null,
    greens_from_fairway: null as number | null,
    greens_from_rough: null as number | null,
  });

  // Calculate net score whenever gross or playing handicap changes
  const net =
    formData.gross !== null && formData.playing_handicap !== null
      ? formData.gross - formData.playing_handicap
      : null;

  // Update par when holes played changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      par: prev.holes_played === 9 ? 36 : 72,
    }));
  }, [formData.holes_played]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Process the form data to ensure zero values are handled correctly
      const processedData = {
        ...formData,
        net,
        golfer_id: golfer.id,
        // Ensure zero values are preserved
        gross: formData.gross === null ? null : Number(formData.gross),
        stableford:
          formData.stableford === null ? null : Number(formData.stableford),
        handicap_index:
          formData.handicap_index === null
            ? null
            : Number(formData.handicap_index),
        playing_handicap:
          formData.playing_handicap === null
            ? null
            : Number(formData.playing_handicap),
        fairways_hit:
          formData.fairways_hit === null ? null : Number(formData.fairways_hit),
        greens_in_regulation:
          formData.greens_in_regulation === null
            ? null
            : Number(formData.greens_in_regulation),
        up_and_down:
          formData.up_and_down === null ? null : Number(formData.up_and_down),
        putts: formData.putts === null ? null : Number(formData.putts),
        penalty_strokes:
          formData.penalty_strokes === null
            ? null
            : Number(formData.penalty_strokes),
        birdies: formData.birdies === null ? null : Number(formData.birdies),
        double_bogeys:
          formData.double_bogeys === null
            ? null
            : Number(formData.double_bogeys),
        three_putts:
          formData.three_putts === null ? null : Number(formData.three_putts),
        greens_on_par_three:
          formData.greens_on_par_three === null
            ? null
            : Number(formData.greens_on_par_three),
        greens_from_fairway:
          formData.greens_from_fairway === null
            ? null
            : Number(formData.greens_from_fairway),
        greens_from_rough:
          formData.greens_from_rough === null
            ? null
            : Number(formData.greens_from_rough),
      };

      await upsertRound(processedData);
      router.push("/rounds");
      router.refresh();
    } catch (error) {
      console.error("Failed to save round:", error);
    }
  };

  // Helper function to handle numeric input changes
  const handleNumericChange = (
    field: keyof typeof formData,
    value: string,
    isFloat = false,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        value === "" ? null : isFloat ? parseFloat(value) : parseInt(value),
    }));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <h3 className="text-lg font-medium">Round Details</h3>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tee</Label>
            <RadioGroup
              value={formData.tee}
              onValueChange={(value) =>
                setFormData({ ...formData, tee: value as TeeColor })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="red" id="red" />
                <Label htmlFor="red">Red</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yellow" id="yellow" />
                <Label htmlFor="yellow">Yellow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="white" id="white" />
                <Label htmlFor="white">White</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blue" id="blue" />
                <Label htmlFor="blue">Blue</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Holes Played</Label>
            <RadioGroup
              value={formData.holes_played.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, holes_played: parseInt(value) })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="9" id="9" />
                <Label htmlFor="9">9 Holes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="18" id="18" />
                <Label htmlFor="18">18 Holes</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.holes_played === 9 && (
            <div className="space-y-2">
              <Label>Side</Label>
              <RadioGroup
                value={formData.side || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, side: value as Side })
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="front" id="front" />
                  <Label htmlFor="front">Front</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="back" id="back" />
                  <Label htmlFor="back">Back</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="par">Par</Label>
            <Input
              id="par"
              type="number"
              min="1"
              value={formData.par}
              onChange={(e) =>
                setFormData({ ...formData, par: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="handicap_index">Handicap Index</Label>
            <Input
              id="handicap_index"
              type="number"
              step="0.1"
              min="0"
              max="54"
              value={formData.handicap_index ?? ""}
              onChange={(e) =>
                handleNumericChange("handicap_index", e.target.value, true)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="playing_handicap">Playing Handicap</Label>
            <Input
              id="playing_handicap"
              type="number"
              min="0"
              value={formData.playing_handicap ?? ""}
              onChange={(e) =>
                handleNumericChange("playing_handicap", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="gross">Gross Score</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="gross"
                type="number"
                min="1"
                value={formData.gross ?? ""}
                onChange={(e) => handleNumericChange("gross", e.target.value)}
                required
              />
              <span className="text-nowrap pl-4 text-sm text-muted-foreground lg:pr-8">
                Net: {net ?? "-"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stableford">Stableford Points</Label>
            <Input
              id="stableford"
              type="number"
              min="0"
              value={formData.stableford ?? ""}
              onChange={(e) =>
                handleNumericChange("stableford", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="fairways_hit">Fairways Hit</Label>
              <span className="text-sm text-muted-foreground">
                Enter as a decimal
              </span>
            </div>
            <Input
              id="fairways_hit"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={formData.fairways_hit ?? ""}
              onChange={(e) =>
                handleNumericChange("fairways_hit", e.target.value, true)
              }
              placeholder="5/12 fairways is 0.42"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="greens_in_regulation">Greens in Regulation</Label>
              <span className="text-sm text-muted-foreground">
                Enter as a decimal
              </span>
            </div>
            <Input
              id="greens_in_regulation"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={formData.greens_in_regulation ?? ""}
              onChange={(e) =>
                handleNumericChange(
                  "greens_in_regulation",
                  e.target.value,
                  true,
                )
              }
              placeholder="10/18 greens is 0.56"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="up_and_down">Up and Down</Label>
              <span className="text-sm text-muted-foreground">
                Enter as a decimal
              </span>
            </div>
            <Input
              id="up_and_down"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={formData.up_and_down ?? ""}
              onChange={(e) =>
                handleNumericChange("up_and_down", e.target.value, true)
              }
              placeholder="4/6 up and downs is 0.67"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="putts">Putts</Label>
            <Input
              id="putts"
              type="number"
              min="0"
              value={formData.putts ?? ""}
              onChange={(e) => handleNumericChange("putts", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="penalty_strokes">Penalty Strokes</Label>
            <Input
              id="penalty_strokes"
              type="number"
              min="0"
              value={formData.penalty_strokes ?? ""}
              onChange={(e) =>
                handleNumericChange("penalty_strokes", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birdies">Birdies</Label>
            <Input
              id="birdies"
              type="number"
              min="0"
              max={formData.holes_played}
              value={formData.birdies ?? ""}
              onChange={(e) => handleNumericChange("birdies", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="double_bogeys">Double Bogeys</Label>
            <Input
              id="double_bogeys"
              type="number"
              min="0"
              max={formData.holes_played}
              value={formData.double_bogeys ?? ""}
              onChange={(e) =>
                handleNumericChange("double_bogeys", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="three_putts">Three Putts</Label>
            <Input
              id="three_putts"
              type="number"
              min="0"
              max={formData.holes_played}
              value={formData.three_putts ?? ""}
              onChange={(e) =>
                handleNumericChange("three_putts", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="greens_on_par_three">Greens on Par 3s</Label>
              <div className="flex items-center gap-2">
                <Badge variant="default">Optional</Badge>
                <span className="text-sm text-muted-foreground">
                  Enter as a decimal
                </span>
              </div>
            </div>
            <Input
              id="greens_on_par_three"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={formData.greens_on_par_three ?? ""}
              onChange={(e) =>
                handleNumericChange("greens_on_par_three", e.target.value, true)
              }
              placeholder="2/4 par 3 greens is 0.5"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="greens_from_fairway">Greens from Fairway</Label>
              <div className="flex items-center gap-2">
                <Badge variant="default">Optional</Badge>
                <span className="text-sm text-muted-foreground">
                  Enter as a decimal
                </span>
              </div>
            </div>
            <Input
              id="greens_from_fairway"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={formData.greens_from_fairway ?? ""}
              onChange={(e) =>
                handleNumericChange("greens_from_fairway", e.target.value, true)
              }
              placeholder="8/12 greens from fairway is 0.67"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="greens_from_rough">Greens from Rough</Label>
              <div className="flex items-center gap-2">
                <Badge variant="default">Optional</Badge>
                <span className="text-sm text-muted-foreground">
                  Enter as a decimal
                </span>
              </div>
            </div>
            <Input
              id="greens_from_rough"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={formData.greens_from_rough ?? ""}
              onChange={(e) =>
                handleNumericChange("greens_from_rough", e.target.value, true)
              }
              placeholder="2/6 greens from rough is 0.33"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/rounds")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Round</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
