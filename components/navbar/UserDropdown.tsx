"use client";

import React from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface UserDropdownProps {
  user: User | null;
  onClose: () => void;
  onSignOut: () => void;
}

interface DropdownMenuItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "default" | "danger";
}

function DropdownMenuItem({
  href,
  onClick,
  children,
  variant = "default",
}: DropdownMenuItemProps) {
  const className = `block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition ${
    variant === "danger"
      ? "text-red-600 dark:text-red-400 w-full text-left"
      : "text-zinc-700 dark:text-zinc-300"
  }`;

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export function UserDropdown({ user, onClose, onSignOut }: UserDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50">
      {user ? (
        <>
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {user.user_metadata?.full_name || "Používateľ"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {user.email}
            </p>
          </div>
          <DropdownMenuItem href="/profile" onClick={onClose}>
            Profil
          </DropdownMenuItem>
          <DropdownMenuItem href="/favorites" onClick={onClose}>
            Obľúbené tímy
          </DropdownMenuItem>
          <DropdownMenuItem variant="danger" onClick={onSignOut}>
            Odhlásiť sa
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem href="/login" onClick={onClose}>
            Prihlásiť sa
          </DropdownMenuItem>
          <DropdownMenuItem href="/register" onClick={onClose}>
            Registrácia
          </DropdownMenuItem>
        </>
      )}
    </div>
  );
}
