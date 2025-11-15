"use client";

import { useState } from "react";
import Link from "next/link";
import { getSportIcon } from "@/lib/utils";

interface Sport {
  id: string;
  name: string;
}

interface MobileSportsFilterProps {
  selectedSport?: string;
  sports: Sport[];
}

export function MobileSportsFilter({
  selectedSport,
  sports,
}: MobileSportsFilterProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedSports = showAll ? sports : sports.slice(0, 5);

  return (
    <div className="lg:hidden mb-3 sm:mb-4 bg-white dark:bg-zinc-900 rounded-xl p-3 sm:p-4 shadow">
      <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 sm:mb-3">
        Sports
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {displayedSports.map((sport) => (
          <Link
            key={sport.id}
            href={`/?sport=${sport.id}`}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-1.5 sm:gap-2 ${
              selectedSport === sport.id
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <span>{getSportIcon(sport.id, sport.name)}</span>
            <span>{sport.name}</span>
          </Link>
        ))}
        {sports.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {showAll
              ? "Zobraziť menej"
              : `Zobraziť viac (${sports.length - 5})`}
          </button>
        )}
      </div>
    </div>
  );
}
