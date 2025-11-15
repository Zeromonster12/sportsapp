import { apiRequestMultiple } from "./api";

export async function fetchTeam(
  id: string,
  opts?: { sport?: string | number; season?: string | number }
): Promise<any | null> {
  const paths = [
    opts?.sport ? `/v2/sports/${opts.sport}/teams/${id}/stats` : null,
    `/v2/teams/${id}/stats`,
    `/teams/${id}`,
    `/team/${id}`,
  ].filter(Boolean) as string[];

  const data = await apiRequestMultiple<any>(paths, {
    params: opts?.season ? { season: opts.season } : undefined,
    silent404: true,
  });

  if (!data) return null;

  if (Array.isArray(data)) {
    if (data.length === 0) return null;
    return { stats: data };
  }

  if (data.team) return data.team;
  if (data.stats) return data;
  return data;
}
