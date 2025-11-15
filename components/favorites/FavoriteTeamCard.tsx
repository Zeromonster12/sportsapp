import Link from "next/link";
import { getSportIcon } from "@/lib/utils";

interface FavoriteTeam {
  id: string;
  name: string;
  sport: string;
  abbreviation?: string;
  league_name?: string;
}

interface FavoriteTeamCardProps {
  team: FavoriteTeam;
  sportName: string;
  onRemove: (teamId: string) => void;
}

export function FavoriteTeamCard({
  team,
  sportName,
  onRemove,
}: FavoriteTeamCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 hover:border-zinc-700 transition group">
      {/* Team Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl">
            {team.abbreviation || team.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-white font-semibold">{team.name}</h3>
            <div className="flex items-center gap-1 text-sm text-zinc-400">
              <span>{getSportIcon(team.sport, "")}</span>
              <span>{team.league_name || sportName}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onRemove(team.id)}
          className="text-zinc-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
          title="Odstrániť z obľúbených"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/team/${team.id}?name=${encodeURIComponent(team.name)}&sport=${
            team.sport
          }`}
          className="flex-1 text-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition"
        >
          Zobraziť tím
        </Link>
        <button
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-yellow-400 rounded-lg transition"
          title="Obľúbené"
        >
          ⭐
        </button>
      </div>
    </div>
  );
}
