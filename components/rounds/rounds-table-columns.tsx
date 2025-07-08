"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Round } from "@/types/round";
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
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "holes_played",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Holes" />;
    },
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "gross",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Score" />;
    },
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "fairways_hit",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Fairways Hit" />;
    },
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "greens_in_regulation",
    header: ({ column }) => {
      return (
        <SortableColumnHeader column={column} title="Greens in Regulation" />
      );
    },
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "up_and_down",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Up and Down" />;
    },
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "putts",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Putts" />;
    },
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "birdies",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Birdies" />;
    },
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "penalty_strokes",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Penalty Strokes" />;
    },
    meta: {
      align: "right",
    },
  },
];
