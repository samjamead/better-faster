# Better Faster Overview

## Summary

The better-faster workflow tracks hole-level scoring, tee shots, approach shots, short game, and putting as separate parts of a round.

Two concepts that must stay separate are:

- `gir`: whether the ball was on the green in regulation for the hole
- `approach_outcome`: what happened on the logged full shot towards the green

The app treats those as different facts. They can agree, but neither is generally derived from the other.

## Logged Approach Shot

The logged approach shot is the full shot towards the green.

It is not necessarily:

- the regulation approach
- the first shot played from the fairway
- the shot that determined GIR

Examples:

- On a par 4, a player can top the tee shot, then hit a later full shot onto the green. That approach outcome is `hit`, while GIR can still be `false`.
- On a short par 4 or par 5, a player can miss the logged approach shot and still make GIR by chipping onto the green in regulation.

## Data Model

### GIR

`gir` is a hole-level boolean:

- `true`: the player reached the green in regulation
- `false`: the player did not
- `null`: not yet logged

### Approach Outcome

`approach_outcome` is a shot-level enum for the logged full shot towards the green:

- `hit`
- `short`
- `long`
- `left`
- `right`
- `sl`
- `sr`
- `ll`
- `lr`
- `null` when no approach outcome has been logged

`approach_outcome = "hit"` means the logged shot finished on the green. It does not mean GIR by itself.

## Valid Combinations

The app allows these combinations:

- `approach_outcome = "hit"` with `gir = true`
- `approach_outcome = "hit"` with `gir = false`
- miss outcome with `gir = true`
- miss outcome with `gir = false`
- no approach outcome logged with GIR still unset

Those combinations are valid because GIR describes the hole and approach outcome describes one shot.

## Par 3 Simplification

There is one retained simplification in the input workflow:

- if the hole is a par 3 and `gir = true`, the app sets `approach_outcome = "hit"`

This is an input convenience for the standard par-3 case where the tee shot finishes on the green in regulation.

Outside that case, GIR and approach outcome are edited independently.

## Input Workflow

The round-entry screen asks for GIR before approach club and approach outcome.

The intended interpretation is:

- GIR answers: was the ball on the green in regulation?
- Approach club answers: what club was used for the logged full shot towards the green?
- Approach outcome answers: what happened on that shot?

On par 3 holes:

- fairway fields stay disabled
- if `gir = true`, approach club is simplified to the tee club and approach outcome is simplified to `hit`
- if `gir` is not true, approach club and approach outcome can be logged independently for a later full shot towards the green

## Summary Logic

Approach summaries use only `approach_outcome`.

- approach attempts are holes with a logged `approach_outcome`
- approach hits are rows where `approach_outcome = "hit"`
- miss-direction summaries are calculated only from non-hit outcomes
- club-based approach accuracy uses rows with both an approach club and an approach outcome

GIR summaries use only `gir`.

- round GIR percentages are calculated from `gir`
- course-hole GIR frequency is calculated from `gir`

This separation keeps shot-level approach reporting independent from hole-level GIR reporting.
