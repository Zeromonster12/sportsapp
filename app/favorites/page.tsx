"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { createClient } from "../../lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { FavoriteTeamCard } from "@/components/favorites/FavoriteTeamCard";
import { EmptyFavoritesState } from "@/components/favorites/EmptyFavoritesState";
import { useFavoritesActions } from "@/hooks/useFavoritesActions";
import { useSportsData } from "@/hooks/useSportsData";

interface FavoriteTeam {
  id: string;
  name: string;
  sport: string;
  abbreviation?: string;
  league_name?: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { getSportName } = useSportsData();

  const { removeFavorite } = useFavoritesActions({
    userId: user?.id,
    onSuccess: (msg) => {
      setMessage({ type: "success", text: msg });
      setTimeout(() => setMessage(null), 3000);
    },
    onError: (msg) => {
      setMessage({ type: "error", text: msg });
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch favorites
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const supabase = createClient();
      const { data, error } = await supabase
        .from("favorite_teams")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Načítavanie...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Obľúbené tímy</h1>
          <p className="text-zinc-400">
            Spravujte svoje obľúbené športové tímy
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-900/30 border-green-800 text-green-400"
                : "bg-red-900/30 border-red-800 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <EmptyFavoritesState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((team) => (
              <FavoriteTeamCard
                key={team.id}
                team={team}
                sportName={getSportName(team.sport)}
                onRemove={removeFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
