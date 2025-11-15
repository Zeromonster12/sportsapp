import React from "react";
import { MatchMeta, MatchStatus } from "@/lib/matchUtils";

interface MatchHeaderProps {
  home: string;
  away: string;
  meta: MatchMeta;
  status: MatchStatus;
}

export function MatchHeader({ home, away, meta, status }: MatchHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">
        {home} vs {away}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {meta.eventDate && (
          <span className="px-2 py-1 rounded bg-zinc-900 text-zinc-300">
            {meta.eventDate.toLocaleString("sk-SK", {
              timeZone: "Europe/Bratislava",
            })}
          </span>
        )}
        <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300">
          {meta.league}
        </span>
        <span
          className={`px-2 py-1 rounded ${
            status.isFinal
              ? "bg-zinc-700 text-zinc-200"
              : status.isLive
              ? "bg-red-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {status.isFinal ? "Final" : status.isLive ? "Live" : "Naplánované"}
        </span>
      </div>
    </>
  );
}
