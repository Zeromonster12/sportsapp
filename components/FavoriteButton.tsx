"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createClient } from "../lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface FavoriteButtonProps {
  teamId: string;
  teamName: string;
  sport: string;
  abbreviation?: string;
  leagueName?: string;
}

export default function FavoriteButton({
  teamId,
  teamName,
  sport,
  abbreviation,
  leagueName,
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: isFavorite = false } = useQuery({
    queryKey: ["favorite", teamId, user?.id],
    queryFn: async () => {
      if (!user) return false;

      const supabase = createClient();
      const { data, error } = await supabase
        .from("favorite_teams")
        .select("id")
        .eq("user_id", user.id)
        .eq("team_id", teamId)
        .maybeSingle();

      return !error && !!data;
    },
    enabled: !!user,
  });

  const toggleMutation = useMutation({
    mutationFn: async (isFavorite: boolean) => {
      if (!user) throw new Error("Not authenticated");

      const supabase = createClient();

      if (isFavorite) {
        const { error } = await supabase
          .from("favorite_teams")
          .delete()
          .eq("user_id", user.id)
          .eq("team_id", teamId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("favorite_teams").insert({
          user_id: user.id,
          team_id: teamId,
          name: teamName,
          sport: sport,
          abbreviation: abbreviation,
          league_name: leagueName,
        });

        if (error) throw error;
      }
    },
    onMutate: async (isFavorite) => {
      await queryClient.cancelQueries({
        queryKey: ["favorite", teamId, user?.id],
      });

      const previousValue = queryClient.getQueryData([
        "favorite",
        teamId,
        user?.id,
      ]);

      queryClient.setQueryData(["favorite", teamId, user?.id], !isFavorite);

      return { previousValue };
    },
    onError: (err, isFavorite, context) => {
      queryClient.setQueryData(
        ["favorite", teamId, user?.id],
        context?.previousValue
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },
  });

  const toggleFavorite = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    toggleMutation.mutate(isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={toggleMutation.isPending}
      className={`p-2 rounded-lg transition ${
        isFavorite
          ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-yellow-400"
      } disabled:opacity-50`}
      title={isFavorite ? "Odstrániť z obľúbených" : "Pridať do obľúbených"}
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={isFavorite ? 0 : 2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
