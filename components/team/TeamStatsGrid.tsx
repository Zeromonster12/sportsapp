import React from "react";
import { TeamStats } from "@/lib/teamUtils";

interface TeamStatsGridProps {
  stats: TeamStats;
}

export function TeamStatsGrid({ stats }: TeamStatsGridProps) {
  const { pointsFor, pointsAgainst, pointsDiff, streak, lastTen } = stats;

  const hasPointsStats =
    pointsFor != null || pointsAgainst != null || pointsDiff != null;
  const hasFormStats = streak || lastTen;

  if (!hasPointsStats && !hasFormStats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
      {/* Points Stats */}
      {pointsFor != null && (
        <div className="bg-zinc-900 rounded-lg p-4 sm:p-6">
          <div className="text-xs text-zinc-500 mb-2">Strelené body</div>
          <div className="text-2xl sm:text-3xl font-bold text-green-400">{pointsFor}</div>
        </div>
      )}
      {pointsAgainst != null && (
        <div className="bg-zinc-900 rounded-lg p-4 sm:p-6">
          <div className="text-xs text-zinc-500 mb-2">Inkasované body</div>
          <div className="text-2xl sm:text-3xl font-bold text-red-400">{pointsAgainst}</div>
        </div>
      )}
      {pointsDiff != null && (
        <div className="bg-zinc-900 rounded-lg p-4 sm:p-6">
          <div className="text-xs text-zinc-500 mb-2">Rozdiel bodov</div>
          <div
            className={`text-2xl sm:text-3xl font-bold ${
              Number(pointsDiff) > 0
                ? "text-green-400"
                : Number(pointsDiff) < 0
                ? "text-red-400"
                : "text-zinc-400"
            }`}
          >
            {Number(pointsDiff) > 0 ? "+" : ""}
            {pointsDiff}
          </div>
        </div>
      )}

      {/* Streak & Form */}
      {streak && (
        <div className="bg-zinc-900 rounded-lg p-4 sm:p-6">
          <div className="text-xs text-zinc-500 mb-2">Aktuálna séria</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{streak}</div>
        </div>
      )}
      {lastTen && (
        <div className="bg-zinc-900 rounded-lg p-4 sm:p-6">
          <div className="text-xs text-zinc-500 mb-2">Posledných 10</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {typeof lastTen === "string"
              ? lastTen
              : `${lastTen.wins ?? 0}-${lastTen.losses ?? 0}`}
          </div>
        </div>
      )}
    </div>
  );
}
