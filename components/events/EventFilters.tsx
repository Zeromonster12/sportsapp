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
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${
              activeFilter === value
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        Posledná aktualizácia: {formatTime(lastUpdate)}
      </div>
    </div>
  );
}
