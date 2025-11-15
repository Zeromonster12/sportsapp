import React from "react";
import Link from "next/link";
import { TeamInfo } from "@/lib/matchUtils";

interface MatchTeamLinksProps {
  home: TeamInfo;
  away: TeamInfo;
  sportId?: string;
}

export function MatchTeamLinks({ home, away, sportId }: MatchTeamLinksProps) {
  const getTeamLink = (teamId: string | null) => {
    if (!teamId) return null;
    return `/team/${encodeURIComponent(teamId)}${
      sportId ? `?sport=${encodeURIComponent(sportId)}` : ""
    }`;
  };

  return (
    <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div className="rounded bg-zinc-900 p-3 sm:p-4">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          Domáci
        </div>
        <div className="mt-2 text-base sm:text-lg font-semibold text-zinc-100">
          {home.id ? (
            <Link href={getTeamLink(home.id)!} className="hover:underline">
              {home.name}
            </Link>
          ) : (
            home.name
          )}
        </div>
      </div>
      <div className="rounded bg-zinc-900 p-3 sm:p-4">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          Hostia
        </div>
        <div className="mt-2 text-base sm:text-lg font-semibold text-zinc-100">
          {away.id ? (
            <Link href={getTeamLink(away.id)!} className="hover:underline">
              {away.name}
            </Link>
          ) : (
            away.name
          )}
        </div>
      </div>
    </div>
  );
}
