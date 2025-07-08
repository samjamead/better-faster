"use client";

import { useState } from "react";
import { getRounds } from "@/api/get-rounds";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LoadingDataTable from "@/components/loading-states/loading-data-table";
import { cn } from "@/lib/utils";
import CalculateCourseStats from "./calculate-course-stats";
import { CourseStats } from "@/types/course-stats";

export default function RoundsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    data: rounds = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rounds"],
    queryFn: () => getRounds(),
  });

  const courseStats = CalculateCourseStats(rounds || []);

  const columns: ColumnDef<CourseStats>[] =
    courseStats.length > 0
      ? Object.keys(courseStats[0]).map((key) => ({
          header: key,
          accessorKey: key,
        }))
      : [];

  const table = useReactTable({
    data: courseStats,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) return <LoadingDataTable />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      cell.column.columnDef.meta?.align === "right" &&
                        "text-right",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
