import type {
  UserBracket,
  ActualResults,
  ActualMatchup,
  ScoreBreakdown,
  Matchup,
} from '../../types/bracket';

function scoreRound(
  userMatchups: Matchup[],
  actualMatchups: ActualMatchup[],
  pts: number
): number {
  return userMatchups.reduce((total, user, i) => {
    const actual = actualMatchups[i];
    if (!actual?.winner) return total;
    return total + (user.winner === actual.winner ? pts : 0);
  }, 0);
}

function scoreMatchup(
  user: Matchup,
  actual: ActualMatchup,
  pts: number
): number {
  if (!actual.winner) return 0;
  return user.winner === actual.winner ? pts : 0;
}

export function scoreBracket(
  user: UserBracket,
  actual: ActualResults
): ScoreBreakdown {
  const eastFirst = scoreRound(user.east.first, actual.east.first, 1);
  const eastSecond = scoreRound(user.east.second, actual.east.second, 2);
  const eastFinals = scoreMatchup(user.east.finals, actual.east.finals, 4);
  const westFirst = scoreRound(user.west.first, actual.west.first, 1);
  const westSecond = scoreRound(user.west.second, actual.west.second, 2);
  const westFinals = scoreMatchup(user.west.finals, actual.west.finals, 4);
  const nbafinals =
    actual.finals.champion != null &&
    user.finals.champion === actual.finals.champion
      ? 8
      : 0;

  return {
    eastFirst,
    eastSecond,
    eastFinals,
    westFirst,
    westSecond,
    westFinals,
    nbafinals,
    total:
      eastFirst +
      eastSecond +
      eastFinals +
      westFirst +
      westSecond +
      westFinals +
      nbafinals,
  };
}
