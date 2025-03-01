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
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Course" />;
    },
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{row.original.course}</div>;
    },
  },
  {
    accessorKey: "handicap_index",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Handicap Index" />;
    },
  },
  {
    accessorKey: "holes_played",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Holes" />;
    },
  },
  {
    accessorKey: "gross",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Score" />;
    },
  },
  {
    accessorKey: "fairways_hit",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Fairways Hit" />;
    },
  },
  {
    accessorKey: "greens_in_regulation",
    header: ({ column }) => {
      return (
        <SortableColumnHeader column={column} title="Greens in Regulation" />
      );
    },
  },
  {
    accessorKey: "up_and_down",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Up and Down" />;
    },
  },
  {
    accessorKey: "putts",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Putts" />;
    },
  },
  {
    accessorKey: "penalty_strokes",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Penalty Strokes" />;
    },
  },
];
