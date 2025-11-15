import React from "react";

interface TeamPeriodStatsProps {
  periodStats: any[];
}

export function TeamPeriodStats({ periodStats }: TeamPeriodStatsProps) {
  if (!periodStats || periodStats.length <= 1) return null;

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <h2 className="text-lg font-bold text-white mb-4">
        Štatistiky podľa období
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-800">
            <tr className="text-left">
              <th className="py-3 pr-4 font-medium text-zinc-400">Obdobie</th>
              <th className="py-3 pr-4 font-medium text-zinc-400">V-P</th>
              <th className="py-3 pr-4 font-medium text-zinc-400">%</th>
              <th className="py-3 pr-4 font-medium text-zinc-400">Body</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {periodStats.slice(0, 10).map((stat: any, idx: number) => {
              const w = stat?.wins ?? stat?.w;
              const l = stat?.losses ?? stat?.l;
              const pct = stat?.win_percentage ?? stat?.win_pct ?? stat?.pct;
              const pf = stat?.points_for ?? stat?.pf;
              const pa = stat?.points_against ?? stat?.pa;
              const label =
                stat?.period ?? stat?.split ?? stat?.type ?? `#${idx + 1}`;
              return (
                <tr key={idx}>
                  <td className="py-3 pr-4 text-zinc-300">{label}</td>
                  <td className="py-3 pr-4 text-white font-medium">
                    {w != null && l != null ? `${w}-${l}` : "-"}
                  </td>
                  <td className="py-3 pr-4 text-white">
                    {pct != null
                      ? `${
                          typeof pct === "number" ? (pct * 100).toFixed(1) : pct
                        }%`
                      : "-"}
                  </td>
                  <td className="py-3 pr-4 text-white">
                    {pf != null && pa != null ? `${pf}-${pa}` : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
