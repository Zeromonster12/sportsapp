import React from "react";
import { TeamStats, formatRecord } from "@/lib/teamUtils";

interface TeamRecordsTableProps {
  stats: TeamStats;
}

export function TeamRecordsTable({ stats }: TeamRecordsTableProps) {
  const { homeRecord, awayRecord, confRecord, divRecord } = stats;

  if (!homeRecord && !awayRecord && !confRecord && !divRecord) return null;

  return (
    <div className="bg-zinc-900 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-white mb-4">Detailná bilancia</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {homeRecord && (
          <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
            <span className="text-zinc-400">Doma</span>
            <span className="text-white font-bold">
              {formatRecord(homeRecord)}
            </span>
          </div>
        )}
        {awayRecord && (
          <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
            <span className="text-zinc-400">Vonku</span>
            <span className="text-white font-bold">
              {formatRecord(awayRecord)}
            </span>
          </div>
        )}
        {confRecord && (
          <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
            <span className="text-zinc-400">Konferencia</span>
            <span className="text-white font-bold">
              {formatRecord(confRecord)}
            </span>
          </div>
        )}
        {divRecord && (
          <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
            <span className="text-zinc-400">Divízia</span>
            <span className="text-white font-bold">
              {formatRecord(divRecord)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
