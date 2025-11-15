import React from "react";

interface DetailedStat {
  name: string;
  value: string;
  perGame?: string;
  rank?: string;
  abbreviation?: string;
}

interface TeamDetailedStatsProps {
  detailedStats: {
    scoring: DetailedStat[];
    offensive: DetailedStat[];
    defensive: DetailedStat[];
    miscellaneous: DetailedStat[];
  };
}

function StatRow({ stat }: { stat: DetailedStat }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-zinc-200">{stat.name}</p>
        {stat.abbreviation && (
          <p className="text-xs text-zinc-500 mt-0.5">{stat.abbreviation}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        {stat.perGame && (
          <div className="text-right">
            <p className="text-xs text-zinc-500">Per Game</p>
            <p className="text-sm text-zinc-300">{stat.perGame}</p>
          </div>
        )}
        <div className="text-right min-w-[60px]">
          <p className="text-xs text-zinc-500">Total</p>
          <p className="text-base font-semibold text-white">{stat.value}</p>
        </div>
        {stat.rank && stat.rank !== "-" && (
          <div className="text-right min-w-[70px]">
            <p className="text-xs text-zinc-500">Rank</p>
            <p className="text-sm font-medium text-blue-400">{stat.rank}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCategory({
  title,
  icon,
  stats,
}: {
  title: string;
  icon: string;
  stats: DetailedStat[];
}) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-bold text-zinc-100">{title}</h3>
      </div>
      <div className="space-y-0">
        {stats.slice(0, 10).map((stat, index) => (
          <StatRow key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export function TeamDetailedStats({ detailedStats }: TeamDetailedStatsProps) {
  if (!detailedStats) return null;

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-zinc-100">Detailné štatistiky</h2>

      <StatCategory
        title="Skórovanie"
        icon="🎯"
        stats={detailedStats.scoring}
      />

      <StatCategory
        title="Ofenzíva"
        icon="⚡"
        stats={detailedStats.offensive}
      />

      <StatCategory title="Obrana" icon="🛡️" stats={detailedStats.defensive} />

      <StatCategory
        title="Ostatné"
        icon="📊"
        stats={detailedStats.miscellaneous}
      />
    </div>
  );
}
