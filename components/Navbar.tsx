"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useClickOutside } from "../hooks/useClickOutside";
import { UserDropdown } from "./navbar/UserDropdown";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleSignOut = async () => {
    await signOut();
    setIsDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur dark:bg-zinc-900/80 sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-zinc-900 dark:text-zinc-100"
        >
          SportsApp
        </Link>

        <div className="flex items-center gap-6">
          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <svg
                  className="w-6 h-6 text-zinc-700 dark:text-zinc-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </button>

            {isDropdownOpen && (
              <UserDropdown
                user={user}
                onClose={() => setIsDropdownOpen(false)}
                onSignOut={handleSignOut}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
