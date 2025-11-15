"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";
import { EventTeam } from "./EventTeam";
import { EventScore } from "./EventScore";
import {
  getEventStatus,
  getTeamNames,
  getTeamIds,
  getScore,
} from "@/lib/utils";

type Event = {
  event_id: string;
  event_date: string;
  score?: any;
  teams?: any[];
  teams_normalized?: Array<{ name: string; is_home: boolean }>;
  [key: string]: any;
};

interface EventCardProps {
  event: Event;
  selectedSport?: string;
}

export function EventCard({ event, selectedSport }: EventCardProps) {
  const router = useRouter();
  const { home, away } = getTeamNames(event);
  const homeNorm = event.teams_normalized?.find((t) => t.is_home);
  const awayNorm = event.teams_normalized?.find((t) => !t.is_home);
  const { homeId, awayId } = getTeamIds(event, homeNorm, awayNorm);
  const eventId = event.event_id || (event as any).id;
  const sportParam =
    selectedSport ?? (event as any).sport_id ?? (event as any).sport?.id;

  const score = getScore(event);
  const { isLive, isFinished } = getEventStatus(event);

  // Determine winner/loser for finished matches
  const awayWon = isFinished && score.hasScore && score.away > score.home;
  const homeWon = isFinished && score.hasScore && score.home > score.away;

  const matchHref = eventId
    ? `/match/${encodeURIComponent(String(eventId))}`
    : null;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      return;
    }
    if (matchHref) {
      router.push(matchHref);
    }
  };

  // Get league name - try multiple possible field names
  const leagueName =
    event.league_name ||
    event.league?.name ||
    event.tournament?.name ||
    event.competition_name ||
    event.competition?.name ||
    event.sport_title ||
    (event as any).event_name ||
    null;

  return (
    <div
      onClick={handleCardClick}
      className={`bg-zinc-900 rounded-lg transition relative ${
        matchHref ? "hover:bg-zinc-800 cursor-pointer" : "opacity-50"
      } ${isFinished ? "p-2 sm:p-3" : "p-3 sm:p-4"} ${
        isLive ? "border border-red-500" : ""
      }`}
    >
      {/* League name */}
      {leagueName && (
        <div className="mb-2 sm:mb-3 pb-2 border-b border-zinc-800">
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500 hidden sm:block"></div>
            <span className="text-xs sm:text-sm font-medium text-zinc-300 text-center">
              {leagueName}
            </span>
            <div className="h-1 w-1 rounded-full bg-blue-500 hidden sm:block"></div>
          </div>
        </div>
      )}

      {/* Favorite buttons */}
      {awayId && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          <FavoriteButton
            teamId={String(awayId)}
            teamName={away}
            sport={String(sportParam || "1")}
            abbreviation={away.substring(0, 2).toUpperCase()}
            leagueName={leagueName || undefined}
          />
        </div>
      )}
      {homeId && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <FavoriteButton
            teamId={String(homeId)}
            teamName={home}
            sport={String(sportParam || "1")}
            abbreviation={home.substring(0, 2).toUpperCase()}
            leagueName={leagueName || undefined}
          />
        </div>
      )}

      {/* Card Content */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
        <EventTeam
          id={awayId}
          name={away}
          sportParam={sportParam}
          isWinner={awayWon}
          isLoser={homeWon}
          side="away"
        />

        <EventScore
          eventDate={event.event_date}
          hasScore={score.hasScore}
          homeScore={score.home}
          awayScore={score.away}
          isLive={isLive}
          isFinished={isFinished}
        />

        <EventTeam
          id={homeId}
          name={home}
          sportParam={sportParam}
          isWinner={homeWon}
          isLoser={awayWon}
          side="home"
        />
      </div>
    </div>
  );
}
