"use client";

import React from "react";
import { formatDate, formatTime } from "@/lib/utils";

interface EventScoreProps {
  eventDate: string;
  hasScore: boolean;
  homeScore: number;
  awayScore: number;
  isLive: boolean;
  isFinished: boolean;
}

export function EventScore({
  eventDate,
  hasScore,
  homeScore,
  awayScore,
  isLive,
  isFinished,
}: EventScoreProps) {
  if (hasScore && (isFinished || isLive)) {
    return (
      <div className="flex flex-col items-center justify-center px-4 min-w-[100px]">
        {isLive ? (
          <span className="flex items-center gap-1.5 text-xs text-red-500 font-semibold mb-2 px-3 py-1 bg-red-500/10 rounded-full uppercase">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Naživo
          </span>
        ) : isFinished ? (
          <span className="text-xs text-zinc-400 font-medium mb-2 px-3 py-1 bg-zinc-800 rounded-full uppercase">
            Ukončené
          </span>
        ) : null}
        <div className="text-lg font-bold text-white">
          {awayScore} : {homeScore}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 mt-1.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">{formatTime(eventDate)}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 mt-0.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate(eventDate)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 min-w-[100px]">
      <span className="text-xs text-blue-400 font-medium mb-2 px-3 py-1 bg-blue-500/10 rounded-full uppercase">
        Naplánované
      </span>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-base font-semibold text-zinc-300">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatTime(eventDate)}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-sm text-zinc-400 mt-1.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate(eventDate)}</span>
        </div>
      </div>
    </div>
  );
}
