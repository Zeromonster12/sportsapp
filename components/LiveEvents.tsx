"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { EventCard } from "./events/EventCard";
import { EventFilters } from "./events/EventFilters";
import { getEventStatus } from "../lib/utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Event = {
  event_id: string;
  event_date: string;
  score?: any;
  teams?: any[];
  teams_normalized?: Array<{ name: string; is_home: boolean }>;
  [key: string]: any;
};

export default function LiveEvents({
  initialEvents,
  selectedSport,
}: {
  initialEvents: Event[];
  selectedSport?: string;
}) {
  const [filter, setFilter] = useState<
    "all" | "upcoming" | "live" | "finished"
  >("all");
  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date());

  const { data, error, isLoading } = useSWR(
    selectedSport ? `/api/events?sport=${selectedSport}` : `/api/events`,
    fetcher,
    {
      fallbackData: { events: initialEvents },
      refreshInterval: 60000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: () => setLastUpdate(new Date()),
    }
  );

  const events = data?.events || initialEvents;

  const filteredEvents = events.filter((event: Event) => {
    if (filter === "all") return true;
    const { isLive, isFinished } = getEventStatus(event);
    if (filter === "live") return isLive;
    if (filter === "finished") return isFinished;
    if (filter === "upcoming") return !isLive && !isFinished;
    return true;
  });

  const sortedEvents = [...filteredEvents].sort((a: Event, b: Event) => {
    const statusA = getEventStatus(a);
    const statusB = getEventStatus(b);

    if (statusA.isLive && !statusB.isLive) return -1;
    if (!statusA.isLive && statusB.isLive) return 1;

    if (statusA.isFinished && !statusB.isFinished) return 1;
    if (!statusA.isFinished && statusB.isFinished) return -1;

    return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
  });

  if (isLoading && events.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-300">Načítavanie...</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Chyba pri načítaní eventov
      </p>
    );
  }

  if (events.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Žiadne eventy alebo chyba pri načítaní.
      </p>
    );
  }

  return (
    <>
      <EventFilters
        activeFilter={filter}
        onFilterChange={setFilter}
        lastUpdate={lastUpdate}
      />

      <div className="space-y-3 mt-4">
        {sortedEvents.map((event: Event, index: number) => (
          <React.Fragment key={event.event_id || event.event_date}>
            <EventCard event={event} selectedSport={selectedSport} />
            {index < sortedEvents.length - 1 && (
              <div className="border-b border-zinc-800/50"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
