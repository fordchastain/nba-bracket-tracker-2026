import type { ScoredEntry, ActualResults, Matchup } from '../../types/bracket';

interface Props {
  entry: ScoredEntry;
  actual: ActualResults;
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
          {bracket.east.first.map((m, i) => (
            <MatchupRow
              key={i}
              matchup={m}
              actualWinner={actual.east.first[i]?.winner}
            />
          ))}
          <h4>
            East — Second Round <em>(2pts)</em>
          </h4>
          {bracket.east.second.map((m, i) => (
            <MatchupRow
              key={i}
              matchup={m}
              actualWinner={actual.east.second[i]?.winner}
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
          {bracket.west.first.map((m, i) => (
            <MatchupRow
              key={i}
              matchup={m}
              actualWinner={actual.west.first[i]?.winner}
            />
          ))}
          <h4>
            West — Second Round <em>(2pts)</em>
          </h4>
          {bracket.west.second.map((m, i) => (
            <MatchupRow
              key={i}
              matchup={m}
              actualWinner={actual.west.second[i]?.winner}
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
