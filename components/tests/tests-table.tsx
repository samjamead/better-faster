"use client";

import { useState } from "react";
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

import { wedgeTestColumns, puttingTestColumns } from "./tests-table-columns";
import LoadingDataTable from "@/components/loading-states/loading-data-table";
import { WedgeTest, PuttingTest } from "@/lib/types";

export default function TestsTable({
  testType,
  queryKey,
  queryFn,
}: {
  testType: string;
  queryKey: string[];
  queryFn: () => Promise<WedgeTest[] | PuttingTest[]>;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    data: tests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn,
  });

  const columns = testType === "wedge" ? wedgeTestColumns : puttingTestColumns;

  const table = useReactTable({
    data: tests,
    columns: columns as ColumnDef<WedgeTest | PuttingTest>[],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  return isLoading ? (
    <LoadingDataTable />
  ) : (
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
                  <TableCell key={cell.id}>
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
