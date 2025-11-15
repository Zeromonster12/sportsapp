import React from "react";
import HomeLayout from "@/components/HomeLayout";
import LiveEvents from "../components/LiveEvents";
import { fetchEvents } from "../lib/fetchEvents";
import { fetchSports } from "../lib/fetchSports";
import { MobileSportsFilter } from "@/components/MobileSportsFilter";

// Cache page for 60 seconds
export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string }>;
}) {
  const params = await searchParams;
  const sports = await fetchSports();

  // If no sport selected, use first sport from list
  const selectedSport =
    params.sport || sports[0]?.sport_id || sports[0]?.id || "1";
  const events = await fetchEvents(selectedSport);

  // Normalize sports data
  const normalizedSports = sports.map((s: any, i: number) => ({
    id: String(s.sport_id ?? s.id ?? i),
    name: String(
      s.sport_name ?? s.name ?? s.title ?? s.sport ?? `Sport ${i + 1}`
    ),
  }));

  // Find the sport name
  const sportName = selectedSport
    ? normalizedSports.find((s) => s.id === String(selectedSport))?.name ??
      `Sport ${selectedSport}`
    : null;

  return (
    <HomeLayout selectedSport={selectedSport} sports={normalizedSports}>
      <main>
        {/* Mobile Sports Filter */}
        <MobileSportsFilter
          selectedSport={selectedSport}
          sports={normalizedSports}
        />

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow">
          <h1 className="text-2xl font-semibold mb-4">
            {sportName || "Events"}
          </h1>

          <LiveEvents initialEvents={events} selectedSport={selectedSport} />
        </div>
      </main>
    </HomeLayout>
  );
}
