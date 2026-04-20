import Leaderboard from './components/Leaderboard';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>NBA Bracket Tracker 2026</h1>
      </header>
      <main className="app-main">
        <div className="scoring-rules">
          <h3 className="scoring-rules-title">Scoring Rules</h3>
          <div className="scoring-rules-items">
            <div className="scoring-rule">
              <span className="scoring-rule-pts">1 pt</span>
              <span className="scoring-rule-label">First Round</span>
            </div>
            <div className="scoring-rule-divider" />
            <div className="scoring-rule">
              <span className="scoring-rule-pts">2 pts</span>
              <span className="scoring-rule-label">Second Round</span>
            </div>
            <div className="scoring-rule-divider" />
            <div className="scoring-rule">
              <span className="scoring-rule-pts">4 pts</span>
              <span className="scoring-rule-label">Conference Finals</span>
            </div>
            <div className="scoring-rule-divider" />
            <div className="scoring-rule">
              <span className="scoring-rule-pts">8 pts</span>
              <span className="scoring-rule-label">NBA Finals Champion</span>
            </div>
          </div>
        </div>
        <Leaderboard />
      </main>
    </div>
  );
}
