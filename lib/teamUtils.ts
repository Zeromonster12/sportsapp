// Types
export interface TeamStats {
  wins?: number;
  losses?: number;
  ties?: number;
  winPct?: number | string;
  pointsFor?: number;
  pointsAgainst?: number;
  pointsDiff?: number;
  homeRecord?: string | { wins?: number; losses?: number };
  awayRecord?: string | { wins?: number; losses?: number };
  confRecord?: string | { wins?: number; losses?: number };
  divRecord?: string | { wins?: number; losses?: number };
  standing?: number;
  conference?: string;
  division?: string;
  streak?: string;
  lastTen?: string | { wins?: number; losses?: number };
}

export interface TeamInfo {
  name: string;
  mascot?: string;
  abbreviation?: string;
  stats: TeamStats;
  periodStats?: any[];
  detailedStats?: any;
  rawData: any;
}

function extractPrimaryStats(team: any): any {
  const stats = team?.stats;
  const hasStats = Array.isArray(stats) && stats.length > 0;
  return hasStats ? stats[0] : team;
}

function extractTeamStats(team: any): TeamStats {
  const primaryStat = extractPrimaryStats(team);
  const record = primaryStat?.record ?? primaryStat?.win_loss_record;

  const wins = primaryStat?.wins ?? primaryStat?.w ?? record?.wins;
  const losses = primaryStat?.losses ?? primaryStat?.l ?? record?.losses;
  const ties = primaryStat?.ties ?? primaryStat?.t ?? record?.ties;
  const winPct =
    primaryStat?.win_percentage ?? primaryStat?.win_pct ?? primaryStat?.pct;

  const pointsFor =
    primaryStat?.points_for ?? primaryStat?.pf ?? primaryStat?.scored;
  const pointsAgainst =
    primaryStat?.points_against ?? primaryStat?.pa ?? primaryStat?.allowed;
  const pointsDiff = primaryStat?.point_differential ?? primaryStat?.diff;

  const homeRecord = primaryStat?.home_record;
  const awayRecord = primaryStat?.away_record;
  const confRecord = primaryStat?.conference_record ?? primaryStat?.conf_record;
  const divRecord = primaryStat?.division_record ?? primaryStat?.div_record;

  const standing = primaryStat?.standing ?? primaryStat?.rank;
  const conference = primaryStat?.conference ?? primaryStat?.conf;
  const division = primaryStat?.division ?? primaryStat?.div;

  const streak = primaryStat?.streak;
  const lastTen = primaryStat?.last_ten ?? primaryStat?.l10;

  return {
    wins,
    losses,
    ties,
    winPct,
    pointsFor,
    pointsAgainst,
    pointsDiff,
    homeRecord,
    awayRecord,
    confRecord,
    divRecord,
    standing,
    conference,
    division,
    streak,
    lastTen,
  };
}

function extractPeriodStats(team: any): any[] | undefined {
  const stats = team?.stats;
  if (!Array.isArray(stats) || stats.length <= 1) return undefined;
  return stats;
}

export function extractDetailedStats(team: any) {
  if (!team?.stats || !Array.isArray(team.stats)) return null;

  const categories = {
    scoring: [] as any[],
    offensive: [] as any[],
    defensive: [] as any[],
    miscellaneous: [] as any[],
  };

  team.stats.forEach((statEntry: any) => {
    const category = statEntry.stat?.category;
    const stat = {
      name: statEntry.stat?.display_name || statEntry.stat?.name,
      value: statEntry.display_value || statEntry.value,
      perGame: statEntry.per_game_display_value,
      rank: statEntry.rank_display_value,
      abbreviation: statEntry.stat?.abbreviation,
    };

    if (category === "scoring") categories.scoring.push(stat);
    else if (
      category?.includes("offensive") ||
      category?.includes("passing") ||
      category?.includes("rushing")
    ) {
      categories.offensive.push(stat);
    } else if (category?.includes("defensive")) categories.defensive.push(stat);
    else categories.miscellaneous.push(stat);
  });

  return categories;
}

export function parseTeamData(team: any, id: string, name?: string): TeamInfo {
  const teamName = name ?? team?.name ?? team?.team_name ?? `Team ${id}`;
  const mascot = team?.mascot;
  const abbreviation = team?.abbreviation ?? team?.abbr;

  return {
    name: teamName,
    mascot,
    abbreviation,
    stats: extractTeamStats(team),
    periodStats: extractPeriodStats(team),
    detailedStats: extractDetailedStats(team),
    rawData: team,
  };
}

export function formatRecord(
  record: string | { wins?: number; losses?: number } | undefined
): string {
  if (!record) return "-";
  if (typeof record === "string") return record;
  return `${record.wins ?? 0}-${record.losses ?? 0}`;
}

export function formatWinPct(winPct: number | string | undefined): string {
  if (winPct == null) return "-";
  if (typeof winPct === "number") return `${(winPct * 100).toFixed(1)}%`;
  return `${winPct}%`;
}
