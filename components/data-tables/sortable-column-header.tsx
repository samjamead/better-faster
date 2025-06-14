import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function SortableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between gap-2 py-3",
        className,
      )}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span className="whitespace-nowrap">{title}</span>
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className="h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ChevronsUpDown className="h-4 w-4 opacity-0" />
      )}
    </button>
  );
}
