import { useState } from 'react';
import { scoreBracket } from '../lib/scorer';
import type { ScoredEntry } from '../../types/bracket';
import { ACTUAL_RESULTS } from '../data/actualResults';
import BracketBreakdown from './BracketBreakdown';
import bracketsData from '../data/brackets.json';

const pointsTotal = ACTUAL_RESULTS.finals.pointsTotal;

const entries: ScoredEntry[] = (
  bracketsData as Parameters<typeof scoreBracket>[0][]
)
  .map((bracket) => {
    const breakdown = scoreBracket(bracket, ACTUAL_RESULTS);
    const tiebreakDiff =
      pointsTotal != null && bracket.finals.pointsGuess != null
        ? Math.abs(bracket.finals.pointsGuess - pointsTotal)
        : null;
    return {
      name: bracket.name,
      bracket,
      score: breakdown.total,
      breakdown,
      tiebreakDiff,
    };
  })
  .sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.tiebreakDiff == null || b.tiebreakDiff == null) return 0;
    return a.tiebreakDiff - b.tiebreakDiff;
  });

export default function Leaderboard() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Progress</th>
            <th>Tiebreaker</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <>
              <tr
                key={entry.name}
                className={expanded === entry.name ? 'expanded-row' : ''}
              >
                <td className="rank">{i + 1}</td>
                <td className="user-name">{entry.name}</td>
                <td className="score">
                  {entry.score}
                  <span className="max">/32</span>
                </td>
                <td className="progress-cell">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(entry.score / 32) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="tiebreaker-cell">
                  {entry.bracket.finals.pointsGuess != null ? (
                    <span className="tiebreaker-guess">
                      {entry.bracket.finals.pointsGuess}
                    </span>
                  ) : (
                    <span className="tiebreaker-tbd">TBD</span>
                  )}
                  {entry.tiebreakDiff != null && (
                    <span className="tiebreaker-diff">
                      off by {entry.tiebreakDiff}
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="details-btn"
                    onClick={() =>
                      setExpanded(expanded === entry.name ? null : entry.name)
                    }
                  >
                    {expanded === entry.name ? '▲ Hide' : '▼ Details'}
                  </button>
                </td>
              </tr>
              {expanded === entry.name && (
                <tr key={`${entry.name}-breakdown`} className="breakdown-row">
                  <td colSpan={6}>
                    <BracketBreakdown entry={entry} actual={ACTUAL_RESULTS} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
