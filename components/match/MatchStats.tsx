import React from "react";
import { TeamInfo, MatchMeta, MatchStatus } from "@/lib/matchUtils";

interface MatchStatsProps {
  home: TeamInfo;
  away: TeamInfo;
  meta: MatchMeta;
  status: MatchStatus;
}

export function MatchStats({ home, away, meta, status }: MatchStatsProps) {
  const hasRecords = home.record || away.record;
  const hasRankings = home.ranking || away.ranking;
  const hasConferences = home.conference?.name || away.conference?.name;

  return (
    <>
      {/* Team Info Grid */}
      {(hasRecords || hasRankings) && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {hasRecords && (
            <div className="p-4 bg-zinc-900 rounded-lg">
              <div className="text-xs text-zinc-500 mb-2">Bilancia</div>
              <div className="space-y-2 text-sm text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">{away.name}:</span>
                  <span className="font-medium">{away.record || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">{home.name}:</span>
                  <span className="font-medium">{home.record || "-"}</span>
                </div>
              </div>
            </div>
          )}

          {hasRankings && (
            <div className="p-4 bg-zinc-900 rounded-lg">
              <div className="text-xs text-zinc-500 mb-2">Ranking</div>
              <div className="space-y-2 text-sm text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">{away.name}:</span>
                  <span className="font-medium">
                    {away.ranking && away.ranking < 99
                      ? `#${away.ranking}`
                      : "Nehodnotený"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">{home.name}:</span>
                  <span className="font-medium">
                    {home.ranking && home.ranking < 99
                      ? `#${home.ranking}`
                      : "Nehodnotený"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Conference Info */}
      {hasConferences && (
        <div className="mt-6 p-4 bg-zinc-900 rounded-lg">
          <div className="text-xs text-zinc-500 mb-2">Konferencia</div>
          <div className="text-sm text-zinc-300">
            {home.conference?.name || away.conference?.name}
            {meta.seasonInfo?.conference_competition && (
              <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded">
                Conference Game
              </span>
            )}
          </div>
        </div>
      )}

      {/* Season Info */}
      {meta.seasonInfo && (
        <div className="mt-6 p-4 bg-zinc-900 rounded-lg">
          <div className="text-xs text-zinc-500 mb-3">Informácie o sezóne</div>
          <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
            {meta.seasonInfo.season_type && (
              <div>
                <span className="text-zinc-500">Typ sezóny:</span>
                <div className="font-medium">{meta.seasonInfo.season_type}</div>
              </div>
            )}
            {meta.seasonInfo.season_year && (
              <div>
                <span className="text-zinc-500">Rok:</span>
                <div className="font-medium">{meta.seasonInfo.season_year}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Venue */}
      {(meta.venue || meta.venueLocation) && (
        <div className="mt-6 p-4 bg-zinc-900 rounded-lg">
          <div className="text-xs text-zinc-500 mb-2">Štadión</div>
          <div className="text-sm text-zinc-300">
            {meta.venue || meta.venueLocation}
          </div>
          {meta.attendance && meta.attendance !== "0" && (
            <div className="mt-2 text-sm text-zinc-400">
              Návštevnosť: {parseInt(meta.attendance).toLocaleString()} divákov
            </div>
          )}
        </div>
      )}

      {/* Broadcast */}
      {meta.broadcast && (
        <div className="mt-6 p-4 bg-zinc-900 rounded-lg">
          <div className="text-xs text-zinc-500 mb-2">Vysielanie</div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium text-zinc-300">
              {meta.broadcast}
            </span>
          </div>
        </div>
      )}

      {/* Game Clock */}
      {status.isLive && meta.gameClock != null && meta.gamePeriod != null && (
        <div className="mt-6 p-4 bg-zinc-900 rounded-lg">
          <div className="text-xs text-zinc-500 mb-2">Herný čas</div>
          <div className="text-lg font-medium text-zinc-300">
            {meta.gamePeriod}. štvrťrok - {meta.gameClock}s
          </div>
        </div>
      )}
    </>
  );
}
