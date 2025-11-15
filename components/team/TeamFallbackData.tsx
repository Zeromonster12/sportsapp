import React from "react";

interface TeamFallbackDataProps {
  team: any;
  hasBasicStats: boolean;
}

export function TeamFallbackData({
  team,
  hasBasicStats,
}: TeamFallbackDataProps) {
  if (hasBasicStats) return null;

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <h2 className="text-lg font-bold text-white mb-4">Dostupné informácie</h2>
      <div className="text-sm text-zinc-300 space-y-2">
        {Object.entries(team)
          .filter(
            ([k, v]) => k !== "stats" && v != null && typeof v !== "object"
          )
          .slice(0, 10)
          .map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <span className="font-medium text-zinc-500">{key}:</span>
              <span>{String(value)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
