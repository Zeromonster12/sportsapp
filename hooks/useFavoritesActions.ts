import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase";

interface FavoriteTeam {
  id: string;
  name: string;
  sport: string;
  abbreviation?: string;
  league_name?: string;
}

interface UseFavoritesActionsProps {
  userId?: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useFavoritesActions({
  userId,
  onSuccess,
  onError,
}: UseFavoritesActionsProps) {
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: async (teamId: string) => {
      if (!userId) throw new Error("Not authenticated");

      const supabase = createClient();
      const { error } = await supabase
        .from("favorite_teams")
        .delete()
        .eq("user_id", userId)
        .eq("team_id", teamId);

      if (error) throw error;
      return teamId;
    },
    onMutate: async (teamId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", userId] });

      const previousFavorites = queryClient.getQueryData(["favorites", userId]);

      queryClient.setQueryData(
        ["favorites", userId],
        (old: FavoriteTeam[] | undefined) =>
          old?.filter((team) => team.id !== teamId) || []
      );

      return { previousFavorites };
    },
    onError: (err, teamId, context) => {
      queryClient.setQueryData(
        ["favorites", userId],
        context?.previousFavorites
      );
      onError?.("Nepodarilo sa odstrániť tím");
      console.error("Error removing favorite:", err);
    },
    onSuccess: (teamId) => {
      queryClient.invalidateQueries({
        queryKey: ["favorite", teamId, userId],
      });
      onSuccess?.("Tím bol odstránený z obľúbených");
    },
  });

  return {
    removeFavorite: (teamId: string) => removeMutation.mutate(teamId),
    isRemoving: removeMutation.isPending,
  };
}
