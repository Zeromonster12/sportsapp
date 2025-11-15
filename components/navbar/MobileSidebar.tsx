"use client";

import React from "react";
import Link from "next/link";
import { getSportIcon } from "@/lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSport?: string;
  sports: Array<{ id: string; name: string }>;
}

export function MobileSidebar({
  isOpen,
  onClose,
  selectedSport,
  sports,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 overflow-y-auto lg:hidden">
        {/* Header */}
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4">
          <span className="text-base font-bold text-zinc-100">Športy</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition"
          >
            <svg
              className="w-5 h-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sports list */}
        <div className="p-3">
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                !selectedSport
                  ? "bg-blue-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span className="text-xl shrink-0">🏆</span>
              <span className="text-sm font-medium truncate">
                Všetky športy
              </span>
            </Link>

            {sports.map((sport) => (
              <Link
                key={sport.id}
                href={`/?sport=${encodeURIComponent(sport.id)}`}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  selectedSport === sport.id
                    ? "bg-blue-600 text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <span className="text-xl shrink-0">
                  {getSportIcon(sport.id, sport.name)}
                </span>
                <span className="text-sm font-medium truncate">
                  {sport.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
