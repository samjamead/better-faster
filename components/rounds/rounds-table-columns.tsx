"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Round } from "@/lib/types";
import { SortableColumnHeader } from "@/components/data-tables/sortable-column-header";
import { format } from "date-fns";
export const columns: ColumnDef<Round>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Round Date" />;
    },
    cell: ({ row }) => {
      return <div>{format(row.original.date, "dd MMM yyyy")}</div>;
    },
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "handicap_index",
    header: "Handicap Index",
  },
  {
    accessorKey: "holes_played",
    header: "Holes",
  },
  {
    accessorKey: "gross",
    header: "Score",
  },
  {
    accessorKey: "fairways_hit",
    header: "Fairways Hit",
  },
  {
    accessorKey: "greens_in_regulation",
    header: "Greens in Regulation",
  },
  {
    accessorKey: "up_and_down",
    header: "Up and Down",
  },
  {
    accessorKey: "putts",
    header: "Putts",
  },
  {
    accessorKey: "penalty_strokes",
    header: "Penalty Strokes",
  },
];
