import React from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { fetchTeam } from "../../../lib/fetchTeam";
import { parseTeamData } from "../../../lib/teamUtils";
import { TeamHeader } from "@/components/team/TeamHeader";
import { TeamStatsGrid } from "@/components/team/TeamStatsGrid";
import { TeamRecordsTable } from "@/components/team/TeamRecordsTable";
import { TeamPeriodStats } from "@/components/team/TeamPeriodStats";
import { TeamFallbackData } from "@/components/team/TeamFallbackData";
import { TeamDetailedStats } from "@/components/team/TeamDetailedStats";

// Cache team page for 24 hours (stats update once per day)
export const revalidate = 86400;

export default async function TeamPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sport?: string; season?: string; name?: string }>;
}) {
  const { id } = await params;
  const { sport, season, name } = await searchParams;
  const team = await fetchTeam(id, { sport, season });

  if (!team) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition mb-6"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div className="bg-zinc-900 rounded-lg p-6">
            <p className="text-sm text-zinc-300">Team detail not available.</p>
          </div>
        </div>
      </div>
    );
  }

  const data = parseTeamData(team, id, name);
  const hasBasicStats =
    data.stats.wins != null ||
    data.stats.losses != null ||
    data.stats.pointsFor != null;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition mb-6"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>

        <TeamHeader
          id={id}
          name={data.name}
          mascot={data.mascot}
          abbreviation={data.abbreviation}
          stats={data.stats}
          sport={sport}
        />

        <TeamStatsGrid stats={data.stats} />

        <TeamRecordsTable stats={data.stats} />

        {data.detailedStats && (
          <TeamDetailedStats detailedStats={data.detailedStats} />
        )}

        <TeamFallbackData team={data.rawData} hasBasicStats={hasBasicStats} />

        {/* Debug Section */}
        <details className="mt-6 bg-zinc-900 rounded-lg p-6">
          <summary className="text-sm font-medium text-zinc-400 cursor-pointer hover:text-zinc-300">
            🔍 Dostupné dáta z API (debug)
          </summary>
          <pre className="mt-4 text-xs text-zinc-500 overflow-x-auto">
            {JSON.stringify(team, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
