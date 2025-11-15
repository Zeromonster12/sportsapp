import React from "react";
import { formatTime } from "@/lib/utils";

type FilterType = "all" | "upcoming" | "live" | "finished";

interface EventFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  lastUpdate: Date;
}

const filters: Array<{ value: FilterType; label: string }> = [
  { value: "all", label: "Všetky" },
  { value: "upcoming", label: "Nadchádzajúce" },
  { value: "live", label: "Live" },
  { value: "finished", label: "Skončené" },
];

export function EventFilters({
  activeFilter,
  onFilterChange,
  lastUpdate,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition ${
              activeFilter === value
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
        Posledná aktualizácia: {formatTime(lastUpdate)}
      </div>
    </div>
  );
}
