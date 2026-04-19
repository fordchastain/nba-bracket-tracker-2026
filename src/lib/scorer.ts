import type { UserBracket, ActualResults, ActualMatchup, ScoreBreakdown, Matchup } from '../../types/bracket';

function matchupKey(team1: string, team2: string): string {
  return [team1, team2].sort().join('|');
}

function buildActualMap(matchups: ActualMatchup[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of matchups) {
    if (m.team1 && m.team2 && m.winner) {
      map.set(matchupKey(m.team1, m.team2), m.winner);
    }
  }
  return map;
}

function scoreRound(userMatchups: Matchup[], actualMatchups: ActualMatchup[], pts: number): number {
  const actualMap = buildActualMap(actualMatchups);
  return userMatchups.reduce((total, m) => {
    const actual = actualMap.get(matchupKey(m.team1, m.team2));
    return total + (actual != null && actual === m.winner ? pts : 0);
  }, 0);
}

function scoreMatchup(user: Matchup, actual: ActualMatchup, pts: number): number {
  if (!actual.team1 || !actual.team2 || !actual.winner) return 0;
  const sameMatchup = matchupKey(user.team1, user.team2) === matchupKey(actual.team1, actual.team2);
  return sameMatchup && user.winner === actual.winner ? pts : 0;
}

export function scoreBracket(user: UserBracket, actual: ActualResults): ScoreBreakdown {
  const eastFirst = scoreRound(user.east.first, actual.east.first, 1);
  const eastSecond = scoreRound(user.east.second, actual.east.second, 2);
  const eastFinals = scoreMatchup(user.east.finals, actual.east.finals, 4);
  const westFirst = scoreRound(user.west.first, actual.west.first, 1);
  const westSecond = scoreRound(user.west.second, actual.west.second, 2);
  const westFinals = scoreMatchup(user.west.finals, actual.west.finals, 4);
  const nbafinals = actual.finals.champion != null && user.finals.champion === actual.finals.champion ? 8 : 0;

  return {
    eastFirst,
    eastSecond,
    eastFinals,
    westFirst,
    westSecond,
    westFinals,
    nbafinals,
    total: eastFirst + eastSecond + eastFinals + westFirst + westSecond + westFinals + nbafinals,
  };
}
