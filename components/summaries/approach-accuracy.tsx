"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateApproachAccuracy } from "@/lib/summary-calculations/calculate-approach-accuracy";

import { SummaryLoader } from "./summary-loader";

export const ApproachAccuracy = () => {
  return (
    <SummaryLoader title="Approach Accuracy">
      {(wideHoleData) => {
        const approachAccuracy = calculateApproachAccuracy(wideHoleData);

        return (
          <Table className="text-xs" borders="none">
            <TableHeader>
              <TableRow>
                <TableHead className="h-auto p-1 pl-0">Club</TableHead>
                <TableHead className="h-auto p-1 text-right">Count</TableHead>
                <TableHead className="h-auto p-1 text-right">Hit %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>tr:first-child>td]:pt-1">
              {approachAccuracy.map((item) => (
                <TableRow key={item.club}>
                  <TableCell className="p-1 pl-0">{item.club}</TableCell>
                  <TableCell className="p-1 text-right">{item.count}</TableCell>
                  <TableCell className="p-1 text-right">
                    {item.hitApproachPercentage.toFixed(0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      }}
    </SummaryLoader>
  );
};
