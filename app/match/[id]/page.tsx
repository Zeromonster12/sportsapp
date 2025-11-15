import React from "react";
import Link from "next/link";
import { fetchMatch } from "../../../lib/fetchMatch";
import { parseMatchData } from "../../../lib/matchUtils";
import Navbar from "@/components/Navbar";
import { MatchHeader } from "@/components/match/MatchHeader";
import { MatchScoreCard } from "@/components/match/MatchScoreCard";
import { MatchPeriods } from "@/components/match/MatchPeriods";
import { MatchTeamLinks } from "@/components/match/MatchTeamLinks";
import { MatchOdds } from "@/components/match/MatchOdds";
import { MatchStats } from "@/components/match/MatchStats";

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = await fetchMatch(id);

  if (!match) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
              >
                <svg
                  className="w-5 h-5 text-zinc-300"
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
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Zápas sa nenašiel.
            </p>
          </div>
        </div>
      </>
    );
  }

  const data = parseMatchData(match);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
            >
              <svg
                className="w-5 h-5 text-zinc-300"
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
          </div>

          <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
            <MatchHeader
              home={data.home.name}
              away={data.away.name}
              meta={data.meta}
              status={data.status}
            />

            <MatchScoreCard
              home={data.home}
              away={data.away}
              status={data.status}
              score={data.score}
              meta={data.meta}
            />

            {data.periods && (
              <MatchPeriods
                periods={data.periods}
                homeTeam={data.home.name}
                awayTeam={data.away.name}
              />
            )}

            <MatchTeamLinks
              home={data.home}
              away={data.away}
              sportId={data.meta.sportId}
            />

            {data.odds && (
              <MatchOdds
                odds={data.odds}
                homeTeam={data.home.name}
                awayTeam={data.away.name}
              />
            )}

            <MatchStats
              home={data.home}
              away={data.away}
              meta={data.meta}
              status={data.status}
            />

            {/* Debug: Available Data */}
            <details className="mt-6 p-4 bg-zinc-900 rounded-lg">
              <summary className="text-sm font-medium text-zinc-300 cursor-pointer">
                🔍 Dostupné dáta z API (debug)
              </summary>
              <pre className="mt-3 text-xs text-zinc-400 overflow-auto max-h-96">
                {JSON.stringify(match, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
