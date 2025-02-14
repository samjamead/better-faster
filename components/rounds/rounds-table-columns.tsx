"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Round } from "@/lib/types";
import { SortableColumnHeader } from "@/components/data-tables/sortable-column-header";

export const columns: ColumnDef<Round>[] = [
  {
    accessorKey: "round_date",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Round Date" />;
    },
  },
  {
    accessorKey: "round_course",
    header: "Course",
  },
  {
    accessorKey: "round_handicap_index",
    header: "Handicap Index",
  },
  {
    accessorKey: "round_holes",
    header: "Holes",
  },
  {
    accessorKey: "round_gross",
    header: "Score",
  },
  {
    accessorKey: "round_fairways_hit",
    header: "Fairways Hit",
  },
  {
    accessorKey: "round_greens_in_regulation",
    header: "Greens in Regulation",
  },
  {
    accessorKey: "round_up_and_down",
    header: "Up and Down",
  },
  {
    accessorKey: "round_putts",
    header: "Putts",
  },
  {
    accessorKey: "round_penalty_strokes",
    header: "Penalty Strokes",
  },
];
