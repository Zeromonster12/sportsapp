import React from "react";
import { PeriodScore } from "@/lib/matchUtils";

interface MatchPeriodsProps {
  periods: PeriodScore[];
  homeTeam: string;
  awayTeam: string;
}

export function MatchPeriods({
  periods,
  homeTeam,
  awayTeam,
}: MatchPeriodsProps) {
  if (!periods || periods.length === 0) return null;

  return (
    <div className="mt-6 p-6 bg-zinc-900 rounded-lg">
      <div className="text-sm font-medium text-zinc-300 mb-3">
        Skóre po častiach
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-zinc-400">
            <tr>
              <th className="text-left py-1 pr-2">Časť</th>
              <th className="text-right py-1 pr-2">{homeTeam}</th>
              <th className="text-right py-1 pr-2">{awayTeam}</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((period, idx) => (
              <tr key={idx} className="border-t border-zinc-800">
                <td className="py-1 pr-2">{idx + 1}.</td>
                <td className="py-1 pr-2 text-right">{period.home}</td>
                <td className="py-1 pr-2 text-right">{period.away}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
