import React from "react";
import Link from "next/link";

interface EventTeamProps {
  id: string | null;
  name: string;
  sportParam?: string;
  isWinner: boolean;
  isLoser: boolean;
  side: "home" | "away";
}

export function EventTeam({
  id,
  name,
  sportParam,
  isWinner,
  isLoser,
  side,
}: EventTeamProps) {
  const abbreviation = name.substring(0, 2).toUpperCase();

  const teamLink = id
    ? `/team/${encodeURIComponent(String(id))}?name=${encodeURIComponent(
        name
      )}${sportParam ? `&sport=${encodeURIComponent(String(sportParam))}` : ""}`
    : null;

  const colorClasses = isWinner
    ? "text-green-400"
    : isLoser
    ? "text-red-400"
    : "text-white";

  const hoverClasses = isWinner
    ? "hover:bg-green-900/30"
    : isLoser
    ? "hover:bg-red-900/30"
    : "";

  const avatarClasses = isWinner
    ? "bg-green-600"
    : isLoser
    ? "bg-zinc-800"
    : "bg-zinc-800";

  const teamContent = (
    <>
      {side === "away" && (
        <>
          {teamLink ? (
            <Link
              href={teamLink}
              className={`font-medium text-right truncate px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-zinc-800 hover:shadow-md ${colorClasses} ${hoverClasses}`}
            >
              {name}
            </Link>
          ) : (
            <span className={`font-medium text-right truncate ${colorClasses}`}>
              {name}
            </span>
          )}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${avatarClasses}`}
          >
            <span className="text-xs font-bold">{abbreviation}</span>
          </div>
        </>
      )}
      {side === "home" && (
        <>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${avatarClasses}`}
          >
            <span className="text-xs font-bold">{abbreviation}</span>
          </div>
          {teamLink ? (
            <Link
              href={teamLink}
              className={`font-medium truncate px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-zinc-800 hover:shadow-md ${colorClasses} ${hoverClasses}`}
            >
              {name}
            </Link>
          ) : (
            <span className={`font-medium truncate ${colorClasses}`}>
              {name}
            </span>
          )}
        </>
      )}
    </>
  );

  return (
    <div
      className={`flex items-center gap-2 flex-1 ${
        side === "away" ? "justify-end" : ""
      } max-w-[40%]`}
    >
      {teamContent}
    </div>
  );
}
