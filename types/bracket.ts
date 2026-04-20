export interface Team {
  id: string;
  name: string;
  seed: number;
  conference: 'east' | 'west';
  logo: string;
}

export interface Matchup {
  team1: string;
  team2: string;
  winner: string;
}

export interface ConferenceBracket {
  first: Matchup[];
  second: Matchup[];
  finals: Matchup;
  champion: string;
}

// A single person's bracket picks (loaded directly from brackets.json)
export interface UserBracket {
  name: string;
  east: ConferenceBracket;
  west: ConferenceBracket;
  finals: { champion: string; pointsGuess: number | null };
}

// Actual results — any field can be null when that series hasn't been played yet
export interface ActualMatchup {
  team1: string | null;
  team2: string | null;
  winner: string | null;
}

export interface ActualConferenceBracket {
  first: ActualMatchup[];
  second: ActualMatchup[];
  finals: ActualMatchup;
  champion: string | null;
}

export interface ActualResults {
  east: ActualConferenceBracket;
  west: ActualConferenceBracket;
  finals: { champion: string | null; pointsTotal: number | null };
}

export interface ScoreBreakdown {
  eastFirst: number;
  eastSecond: number;
  eastFinals: number;
  westFirst: number;
  westSecond: number;
  westFinals: number;
  nbafinals: number;
  total: number;
}

export interface ScoredEntry {
  name: string;
  bracket: UserBracket;
  score: number;
  breakdown: ScoreBreakdown;
  tiebreakDiff: number | null;
}
