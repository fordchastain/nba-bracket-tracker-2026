import type {
  ScoredEntry,
  ActualResults,
  ActualMatchup,
  Matchup,
} from '../../types/bracket';

interface Props {
  entry: ScoredEntry;
  actual: ActualResults;
}

function matchupKey(team1: string, team2: string): string {
  return [team1, team2].sort().join('|');
}

function buildActualMap(matchups: ActualMatchup[]): Map<string, string | null> {
  const map = new Map<string, string | null>();
  for (const m of matchups) {
    if (m.team1 && m.team2) map.set(matchupKey(m.team1, m.team2), m.winner);
  }
  return map;
}

function MatchupRow({
  matchup,
  actualWinner,
}: {
  matchup: Matchup;
  actualWinner: string | null | undefined;
}) {
  const pending = actualWinner === undefined || actualWinner === null;
  const correct = !pending && matchup.winner === actualWinner;
  const incorrect = !pending && matchup.winner !== actualWinner;
  return (
    <div
      className={`matchup-row${correct ? ' correct' : incorrect ? ' incorrect' : ' pending'}`}
    >
      <span className="teams">
        {matchup.team1} vs {matchup.team2}
      </span>
      <span className="pick">{matchup.winner}</span>
      {pending && <span className="tbd">TBD</span>}
      {incorrect && (
        <span className="actual-result">Actual: {actualWinner}</span>
      )}
    </div>
  );
}

export default function BracketBreakdown({ entry, actual }: Props) {
  const { bracket, breakdown } = entry;

  const eastFirstMap = buildActualMap(actual.east.first);
  const eastSecondMap = buildActualMap(actual.east.second);
  const westFirstMap = buildActualMap(actual.west.first);
  const westSecondMap = buildActualMap(actual.west.second);

  const finalsChamp = actual.finals.champion;
  const finalsCorrect =
    finalsChamp != null && bracket.finals.champion === finalsChamp;
  const finalsIncorrect =
    finalsChamp != null && bracket.finals.champion !== finalsChamp;

  return (
    <div className="breakdown">
      <div className="breakdown-scores">
        <span>East 1st: {breakdown.eastFirst}/4</span>
        <span>East 2nd: {breakdown.eastSecond}/4</span>
        <span>East Finals: {breakdown.eastFinals}/4</span>
        <span>West 1st: {breakdown.westFirst}/4</span>
        <span>West 2nd: {breakdown.westSecond}/4</span>
        <span>West Finals: {breakdown.westFinals}/4</span>
        <span>NBA Finals: {breakdown.nbafinals}/8</span>
        <strong>Total: {breakdown.total}/32</strong>
      </div>

      <div className="breakdown-columns">
        <div className="breakdown-section">
          <h4>
            East — First Round <em>(1pt)</em>
          </h4>
          {bracket.east.first.map((m) => (
            <MatchupRow
              key={matchupKey(m.team1, m.team2)}
              matchup={m}
              actualWinner={eastFirstMap.get(matchupKey(m.team1, m.team2))}
            />
          ))}
          <h4>
            East — Second Round <em>(2pts)</em>
          </h4>
          {bracket.east.second.map((m) => (
            <MatchupRow
              key={matchupKey(m.team1, m.team2)}
              matchup={m}
              actualWinner={eastSecondMap.get(matchupKey(m.team1, m.team2))}
            />
          ))}
          <h4>
            East — Conference Finals <em>(4pts)</em>
          </h4>
          <MatchupRow
            matchup={bracket.east.finals}
            actualWinner={actual.east.finals.winner}
          />
        </div>

        <div className="breakdown-section">
          <h4>
            West — First Round <em>(1pt)</em>
          </h4>
          {bracket.west.first.map((m) => (
            <MatchupRow
              key={matchupKey(m.team1, m.team2)}
              matchup={m}
              actualWinner={westFirstMap.get(matchupKey(m.team1, m.team2))}
            />
          ))}
          <h4>
            West — Second Round <em>(2pts)</em>
          </h4>
          {bracket.west.second.map((m) => (
            <MatchupRow
              key={matchupKey(m.team1, m.team2)}
              matchup={m}
              actualWinner={westSecondMap.get(matchupKey(m.team1, m.team2))}
            />
          ))}
          <h4>
            West — Conference Finals <em>(4pts)</em>
          </h4>
          <MatchupRow
            matchup={bracket.west.finals}
            actualWinner={actual.west.finals.winner}
          />
        </div>
      </div>

      <div className="breakdown-section finals-section">
        <h4>
          NBA Finals Champion <em>(8pts)</em>
        </h4>
        <div
          className={`matchup-row${finalsCorrect ? ' correct' : finalsIncorrect ? ' incorrect' : ' pending'}`}
        >
          <span className="pick">{bracket.finals.champion}</span>
          {finalsChamp == null && <span className="tbd">TBD</span>}
          {finalsIncorrect && (
            <span className="actual-result">Actual: {finalsChamp}</span>
          )}
        </div>
      </div>
    </div>
  );
}
