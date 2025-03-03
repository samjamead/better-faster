"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WedgeTest, PuttingTest } from "@/lib/types";
import { SortableColumnHeader } from "@/components/data-tables/sortable-column-header";
import { format } from "date-fns";
export const wedgeTestColumns: ColumnDef<WedgeTest>[] = [
  {
    accessorKey: "test_date",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Test Date" />;
    },
    cell: ({ row }) => {
      return <div>{format(row.original.test_date, "dd MMM yyyy")}</div>;
    },
  },
  {
    accessorKey: "shots_hit",
    header: "Shots Hit",
  },
  {
    accessorKey: "average_proximity",
    header: "Average Proximity (ft)",
  },
  {
    accessorKey: "landing_spot_percentage",
    header: "Landing Spot %",
  },
  {
    accessorKey: "trajectory_percentage",
    header: "Trajectory %",
  },
  {
    accessorKey: "quality_contact_percentage",
    header: "Quality Contact %",
  },
];

export const puttingTestColumns: ColumnDef<PuttingTest>[] = [
  {
    accessorKey: "test_date",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Test Date" />;
    },
    cell: ({ row }) => {
      return <div>{format(row.original.test_date, "dd MMM yyyy")}</div>;
    },
  },
  {
    accessorKey: "strokes_gained_putting",
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Strokes Gained" />;
    },
  },
];
