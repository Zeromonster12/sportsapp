export interface TeamInfo {
  id: string | null;
  name: string;
  abbreviation: string;
  ranking?: number;
  record?: string;
  conference?: {
    name?: string;
  };
}

export interface MatchStatus {
  status: string;
  isLive: boolean;
  isFinal: boolean;
}

export interface MatchScore {
  home: number | undefined;
  away: number | undefined;
  homeWon: boolean;
  awayWon: boolean;
}

export interface MatchMeta {
  eventDate: Date | null;
  league: string;
  sportId?: string;
  broadcast?: string;
  venue?: string;
  venueLocation?: string;
  attendance?: string;
  gameClock?: string;
  gamePeriod?: string;
  seasonInfo?: any;
}

export interface OddsInfo {
  moneyline?: any;
  spread?: any;
  total?: any;
}

export interface PeriodScore {
  home: number | string;
  away: number | string;
}

export interface ParsedMatchData {
  home: TeamInfo;
  away: TeamInfo;
  status: MatchStatus;
  score: MatchScore;
  meta: MatchMeta;
  odds?: OddsInfo;
  periods?: PeriodScore[];
}

function extractTeamInfo(match: any, teamObj: any, isHome: boolean): TeamInfo {
  const fallbackTeams = match.teams || [];
  const fallbackTeam = isHome ? fallbackTeams[0] : fallbackTeams[1];

  const name =
    teamObj?.name ||
    (isHome ? match.home_team : match.away_team) ||
    fallbackTeam?.name ||
    (isHome ? "Home" : "Away");

  const id =
    (isHome ? match.home_team_id : match.away_team_id) ||
    teamObj?.id ||
    teamObj?.team_id ||
    fallbackTeams.find((t: any) => t.is_home === isHome)?.team_id ||
    fallbackTeam?.team_id ||
    null;

  return {
    id: id ? String(id) : null,
    name,
    abbreviation: name.substring(0, 2).toUpperCase(),
    ranking: teamObj?.ranking,
    record: teamObj?.record,
    conference: teamObj?.conference,
  };
}

function extractStatus(match: any): MatchStatus {
  const status: string =
    match.event_status || match.score?.event_status || "scheduled";

  const isLive =
    typeof status === "string" &&
    (status.toLowerCase().includes("live") ||
      status.toLowerCase().includes("progress"));

  const isFinal =
    typeof status === "string" &&
    (status.toLowerCase().includes("final") ||
      status.toLowerCase().includes("finished"));

  return { status, isLive, isFinal };
}

function extractScore(match: any, isFinal: boolean): MatchScore {
  const home = match.score?.score_home;
  const away = match.score?.score_away;

  const homeWon = isFinal && home != null && away != null && home > away;
  const awayWon = isFinal && home != null && away != null && away > home;

  return { home, away, homeWon, awayWon };
}

function extractMeta(match: any): MatchMeta {
  return {
    eventDate: match.event_date ? new Date(match.event_date) : null,
    league:
      match.league_name || match.tournament?.name || match.sport_title || "-",
    sportId: match.sport_id,
    broadcast: match.score?.broadcast,
    venue: match.score?.venue_name,
    venueLocation: match.score?.venue_location,
    attendance: match.schedule?.attendance,
    gameClock: match.score?.game_clock,
    gamePeriod: match.score?.game_period,
    seasonInfo: match.schedule,
  };
}

function extractOdds(match: any): OddsInfo | undefined {
  const rawOdds = match.odds || match.lines;
  if (!rawOdds) return undefined;

  const oddsSource = Array.isArray(rawOdds) ? rawOdds[0] : rawOdds;
  if (!oddsSource || typeof oddsSource !== "object") return undefined;

  return {
    moneyline: oddsSource.moneyline || oddsSource.ml,
    spread: oddsSource.spread || oddsSource.spreads,
    total: oddsSource.total || oddsSource.totals,
  };
}

function extractPeriods(match: any): PeriodScore[] | undefined {
  const periodsRaw = match.score?.periods || match.score?.scores_by_period;
  if (!Array.isArray(periodsRaw)) return undefined;

  return periodsRaw
    .map((p: any) => {
      const home = p?.home ?? p?.score_home ?? p?.h;
      const away = p?.away ?? p?.score_away ?? p?.a;
      if (home == null && away == null) return null;
      return { home: home ?? "-", away: away ?? "-" };
    })
    .filter(Boolean) as PeriodScore[];
}

export function parseMatchData(match: any): ParsedMatchData {
  const homeTeam = match.teams_normalized?.find((t: any) => t.is_home);
  const awayTeam = match.teams_normalized?.find((t: any) => !t.is_home);

  const status = extractStatus(match);
  const score = extractScore(match, status.isFinal);

  return {
    home: extractTeamInfo(match, homeTeam, true),
    away: extractTeamInfo(match, awayTeam, false),
    status,
    score,
    meta: extractMeta(match),
    odds: extractOdds(match),
    periods: extractPeriods(match),
  };
}
