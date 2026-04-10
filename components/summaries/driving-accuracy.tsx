"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateDrivingAccuracy } from "@/lib/summary-calculations/calculate-driving-accuracy";

import { SummaryLoader } from "./summary-loader";

export const DrivingAccuracy = () => {
  return (
    <SummaryLoader title="Driving Accuracy">
      {(wideHoleData) => {
        const drivingAccuracy = calculateDrivingAccuracy(wideHoleData);

        return (
          <Table className="text-xs" borders="none">
            <TableHeader>
              <TableRow>
                <TableHead className="h-auto p-1 pl-0">Club</TableHead>
                <TableHead className="h-auto p-1 text-right">Count</TableHead>
                <TableHead className="h-auto p-1 text-right">Hit %</TableHead>
                <TableHead className="h-auto p-1 text-right">Left %</TableHead>
                <TableHead className="h-auto p-1 text-right">Right %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>tr:first-child>td]:pt-1">
              {drivingAccuracy.map((item) => (
                <TableRow key={item.club}>
                  <TableCell className="p-1 pl-0">{item.club}</TableCell>
                  <TableCell className="p-1 text-right">{item.count}</TableCell>
                  <TableCell className="p-1 text-right">
                    {item.hitFairwayPercentage.toFixed(0)}
                  </TableCell>
                  <TableCell className="p-1 text-right">
                    {item.missLeftPercentage.toFixed(0)}
                  </TableCell>
                  <TableCell className="p-1 text-right">
                    {item.missRightPercentage.toFixed(0)}
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
