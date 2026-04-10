"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TableBorders =
  | "all"
  | "vertical"
  | "horizontal"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "none";

const TableContext = React.createContext<{ borders: TableBorders }>({
  borders: "all",
});

function useTableContext() {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a Table");
  }
  return context;
}

function Table({
  className,
  borders = "all",
  ...props
}: React.ComponentProps<"table"> & { borders?: TableBorders }) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <TableContext.Provider value={{ borders }}>
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </TableContext.Provider>
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  const { borders } = useTableContext();
  const showBorderBottom =
    borders === "all" || borders === "horizontal" || borders === "bottom";

  return (
    <thead
      data-slot="table-header"
      className={cn(showBorderBottom && "[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr:last-child]:border-0 [&>tr:first-child>td]:pt-3",
        className,
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  const { borders } = useTableContext();
  const showBorderTop =
    borders === "all" || borders === "horizontal" || borders === "top";

  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 font-medium last:[&>tr]:border-b-0",
        showBorderTop ? "border-t" : "border-t-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  const { borders } = useTableContext();
  const showBorderBottom =
    borders === "all" || borders === "horizontal" || borders === "bottom";

  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors",
        showBorderBottom ? "border-b" : "border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  const { borders } = useTableContext();
  const showBorderLeft =
    borders === "all" || borders === "vertical" || borders === "left";
  const showBorderRight =
    borders === "all" || borders === "vertical" || borders === "right";

  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        showBorderLeft && "border-l",
        showBorderRight && "border-r",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  const { borders } = useTableContext();
  const showBorderLeft =
    borders === "all" || borders === "vertical" || borders === "left";
  const showBorderRight =
    borders === "all" || borders === "vertical" || borders === "right";

  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        showBorderLeft && "border-l",
        showBorderRight && "border-r",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
