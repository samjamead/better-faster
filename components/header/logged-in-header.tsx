"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import { getGolferSummary } from "./server-actions";

type GolferSummaryProps = {
  data: {
    name: string;
    handicap: number;
    holes_per_birdie: number;
    most_played_course: string;
    holes_played: number;
  } | null;
};

export const GolferSummary = ({ data }: GolferSummaryProps) => {
  if (!data) return null;

  // Check if all values except name are null/0
  const isNewGolfer =
    !data.holes_per_birdie && !data.most_played_course && !data.holes_played;

  if (isNewGolfer) {
    return <p>Hi {data.name}! Welcome to Better Faster</p>;
  }

  const messages = [
    ...(data.holes_per_birdie > 0
      ? [
          `${data.name} (${data.handicap}) makes birdie every ${data.holes_per_birdie} holes`,
        ]
      : []),
    `${data.name} (${data.handicap}) most played course is ${data.most_played_course}`,
    `${data.name} (${data.handicap}) has played ${data.holes_played} holes`,
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return <p>{randomMessage}</p>;
};

export default function LoggedInHeader() {
  const pathname = usePathname();
  const [displaySummary, setDisplaySummary] =
    useState<GolferSummaryProps["data"]>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getGolferSummary();
      setDisplaySummary(data);
    };
    fetchSummary();
  }, []);

  const pathDepth = pathname.slice(1).split("/").filter(Boolean).length;

  return (
    <div>
      {pathDepth > 1 ? (
        <Breadcrumbs />
      ) : (
        <GolferSummary data={displaySummary} />
      )}
    </div>
  );
}
