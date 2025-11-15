"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getSportIcon } from "../lib/utils";

type SidebarProps = {
  selectedSport?: string;
  sports: Array<{ id: string; name: string }>;
};

type SportLinkProps = {
  href: string;
  icon: string;
  label: string;
  active: boolean;
};

function SportLink({ href, icon, label, active }: SportLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      <span className="text-xl shrink-0">{icon}</span>
      <span className="text-sm font-medium truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar({ selectedSport, sports }: SidebarProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedSports = showAll ? sports : sports.slice(0, 5);

  return (
    <aside className="sticky top-4 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden shrink-0">
      {/* Header */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4">
        <Link
          href="/"
          className="text-base font-bold text-zinc-900 dark:text-zinc-100"
        >
          Športy
        </Link>
      </div>

      {/* Sports list */}
      <div
        className={`p-3 ${
          showAll
            ? "max-h-[calc(100vh-12rem)] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
            : ""
        }`}
      >
        <nav className="space-y-1">
          {displayedSports.map((sport) => (
            <SportLink
              key={sport.id}
              href={`/?sport=${encodeURIComponent(sport.id)}`}
              icon={getSportIcon(sport.id, sport.name)}
              label={sport.name}
              active={selectedSport === sport.id}
            />
          ))}
        </nav>
      </div>

      {/* Show More Button*/}
      {sports.length > 5 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-2 px-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {showAll ? (
              <>
                <span>Zobraziť menej</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Zobraziť viac ({sports.length - 5})</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </aside>
  );
}
