export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Bratislava",
  });
}

export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Bratislava",
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("sk-SK", {
    timeZone: "Europe/Bratislava",
  });
}

export function getEventStatus(event: any) {
  const status = event.event_status || event.score?.event_status || "scheduled";
  const isLive =
    status.toLowerCase().includes("live") ||
    status.toLowerCase().includes("progress");
  const isFinished =
    status.toLowerCase().includes("final") ||
    status.toLowerCase().includes("finished");

  return { status, isLive, isFinished };
}

export function getTeamNames(event: any) {
  const homeNorm = event.teams_normalized?.find((t: any) => t.is_home);
  const awayNorm = event.teams_normalized?.find((t: any) => !t.is_home);

  return {
    home: homeNorm?.name || event.teams?.[0]?.name || event.home_team || "Home",
    away: awayNorm?.name || event.teams?.[1]?.name || event.away_team || "Away",
  };
}

export function getTeamIds(event: any, homeNorm?: any, awayNorm?: any) {
  return {
    homeId:
      event.home_team_id ||
      homeNorm?.id ||
      homeNorm?.team_id ||
      event.teams?.[0]?.team_id ||
      event.teams?.[0]?.id,
    awayId:
      event.away_team_id ||
      awayNorm?.id ||
      awayNorm?.team_id ||
      event.teams?.[1]?.team_id ||
      event.teams?.[1]?.id,
  };
}

export function getScore(event: any) {
  const hasScore =
    event.score &&
    (event.score.score_home != null || event.score.score_away != null);
  return {
    hasScore,
    home: event.score?.score_home ?? 0,
    away: event.score?.score_away ?? 0,
  };
}

export const sportIcons: Record<string, string> = {
  "1": "🏈", // NCAA Football
  "2": "🏈", // NFL
  "3": "⚾", // MLB
  "4": "🏀", // NBA
  "5": "🏀", // NCAA Men's Basketball
  "6": "🏒", // NHL
  "7": "⚽", // Soccer/MLS
  "8": "⚽", // EPL
  "9": "⚽", // La Liga
  "10": "⚽", // Bundesliga
  "11": "⚽", // Serie A
  "12": "⚽", // Ligue 1
  "13": "🥊", // UFC/MMA
  "14": "🏏", // Cricket
  "15": "🏀", // WNBA
};

export function getSportIcon(sportId: string, sportName: string): string {
  if (sportIcons[sportId]) return sportIcons[sportId];

  const name = sportName.toLowerCase();
  if (name.includes("ncaa") && name.includes("football")) return "🏈";
  if (name.includes("nfl")) return "🏈";
  if (name.includes("nba")) return "🏀";
  if (name.includes("ncaa") && name.includes("bask")) return "🏀";
  if (name.includes("mlb")) return "⚾";
  if (name.includes("nhl")) return "🏒";
  if (name.includes("wnba")) return "🏀";
  if (name.includes("ufc") || name.includes("mma")) return "🥊";
  if (name.includes("mls")) return "⚽";
  if (name.includes("epl") || name.includes("premier")) return "⚽";
  if (name.includes("fra1") || name.includes("ligue")) return "⚽";
  if (name.includes("ger1") || name.includes("bundesliga")) return "⚽";
  if (name.includes("esp1") || name.includes("la liga")) return "⚽";
  if (name.includes("ita1") || name.includes("serie")) return "⚽";
  if (name.includes("uefa") || name.includes("champion")) return "⚽";
  if (name.includes("soccer") || name.includes("football")) return "⚽";
  if (name.includes("cricket")) return "🏏";
  if (name.includes("tennis")) return "🎾";
  if (name.includes("golf")) return "⛳";
  if (name.includes("boxing")) return "🥊";

  return "🏆";
}
