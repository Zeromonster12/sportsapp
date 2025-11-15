import React from "react";
import FavoriteButton from "@/components/FavoriteButton";
import { TeamStats } from "@/lib/teamUtils";

interface TeamHeaderProps {
  id: string;
  name: string;
  mascot?: string;
  abbreviation?: string;
  stats: TeamStats;
  sport?: string;
}

export function TeamHeader({
  id,
  name,
  mascot,
  abbreviation,
  stats,
  sport,
}: TeamHeaderProps) {
  const teamAbbr = abbreviation || name.substring(0, 3).toUpperCase();
  const { wins, losses, ties, winPct, standing, conference, division } = stats;

  return (
    <div className="bg-zinc-900 rounded-lg p-4 sm:p-6 md:p-8 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Team Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{teamAbbr}</span>
        </div>

        {/* Team Info */}
        <div className="flex-1 w-full">
          <div className="flex items-start justify-between mb-2 gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{name}</h1>
            <FavoriteButton
              teamId={id}
              teamName={name}
              sport={sport || "1"}
              abbreviation={abbreviation}
            />
          </div>
          {mascot && <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-3">{mascot}</p>}
          <div className="flex flex-wrap gap-2">
            {abbreviation && (
              <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                {abbreviation}
              </span>
            )}
            {conference && (
              <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm">
                {conference}
              </span>
            )}
            {division && (
              <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm">
                {division}
              </span>
            )}
            {standing != null && standing < 99 && (
              <span className="px-3 py-1 rounded-full bg-yellow-900/30 text-yellow-400 text-sm font-medium">
                #{standing} Ranking
              </span>
            )}
          </div>
        </div>

        {/* Record Badge */}
        {(wins != null || losses != null) && (
          <div className="text-center w-full sm:w-auto mt-4 sm:mt-0">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {wins ?? 0}-{losses ?? 0}
              {ties != null && ties > 0 && `-${ties}`}
            </div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Bilancia</div>
            {winPct != null && (
              <div className="text-base sm:text-lg text-blue-400 font-medium mt-1">
                {typeof winPct === "number"
                  ? (winPct * 100).toFixed(1)
                  : winPct}
                %
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
