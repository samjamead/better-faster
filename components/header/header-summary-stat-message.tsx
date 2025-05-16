"use client";

import { useState } from "react";

export type GolferSummaryProps = {
  data: {
    name: string;
    handicap: number;
    holes_per_birdie: number;
    most_played_course: string;
    holes_played: number;
  } | null;
};

export const HeaderSummaryStatMessage = ({ data }: GolferSummaryProps) => {
  const [index, setIndex] = useState(0);

  if (!data) return null;

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

  return (
    <p
      onClick={() => {
        setIndex((index) => (index + 1) % messages.length);
      }}
    >
      {messages[index]}
    </p>
  );
};
