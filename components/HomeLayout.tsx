"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Sport {
  id: string;
  name: string;
}

interface HomeLayoutProps {
  selectedSport?: string;
  sports: Sport[];
  children: React.ReactNode;
}

export default function HomeLayout({
  selectedSport,
  sports,
  children,
}: HomeLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-2 sm:p-3 md:p-4">
        <div className="flex gap-3 sm:gap-4 mx-auto max-w-6xl items-start">
          <div className="hidden lg:block">
            <Sidebar selectedSport={selectedSport} sports={sports} />
          </div>

          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
