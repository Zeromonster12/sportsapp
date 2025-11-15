import React from "react";
import { TeamInfo, MatchStatus, MatchScore, MatchMeta } from "@/lib/matchUtils";

interface MatchScoreCardProps {
  home: TeamInfo;
  away: TeamInfo;
  status: MatchStatus;
  score: MatchScore;
  meta: MatchMeta;
}

export function MatchScoreCard({
  home,
  away,
  status,
  score,
  meta,
}: MatchScoreCardProps) {
  return (
    <div className="mt-6 p-6 bg-zinc-900 rounded-lg">
      <div className="flex items-center justify-center gap-12">
        {/* Away Team */}
        <div className="flex flex-col items-center gap-3 flex-1 max-w-[35%]">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              score.awayWon
                ? "bg-green-600"
                : score.homeWon
                ? "bg-zinc-800"
                : "bg-zinc-800"
            }`}
          >
            <span className="text-2xl font-bold">{away.abbreviation}</span>
          </div>
          <span
            className={`font-semibold text-lg text-center ${
              score.awayWon
                ? "text-green-400"
                : score.homeWon
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {away.name}
          </span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center justify-center px-8">
          {status.isLive && (
            <span className="text-sm text-red-500 font-semibold mb-2 uppercase">
              Live
            </span>
          )}
          {status.isFinal && (
            <span className="text-sm text-zinc-500 font-medium mb-2 uppercase">
              Final
            </span>
          )}
          {score.home != null && score.away != null ? (
            <div className="text-5xl font-bold text-white">
              {score.away} : {score.home}
            </div>
          ) : (
            <div className="text-2xl font-medium text-zinc-400">VS</div>
          )}
          {meta.eventDate && (
            <div className="mt-3 text-center">
              <div className="text-sm text-zinc-400">
                {meta.eventDate.toLocaleTimeString("sk-SK", {
                  timeZone: "Europe/Bratislava",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-xs text-zinc-500">
                {meta.eventDate.toLocaleDateString("sk-SK", {
                  timeZone: "Europe/Bratislava",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          )}
        </div>

        {/* Home Team */}
        <div className="flex flex-col items-center gap-3 flex-1 max-w-[35%]">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              score.homeWon
                ? "bg-green-600"
                : score.awayWon
                ? "bg-zinc-800"
                : "bg-zinc-800"
            }`}
          >
            <span className="text-2xl font-bold">{home.abbreviation}</span>
          </div>
          <span
            className={`font-semibold text-lg text-center ${
              score.homeWon
                ? "text-green-400"
                : score.awayWon
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {home.name}
          </span>
        </div>
      </div>
    </div>
  );
}
