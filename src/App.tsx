import Leaderboard from './components/Leaderboard';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>NBA Bracket Tracker 2026</h1>
      </header>
      <main className="app-main">
        <Leaderboard />
      </main>
    </div>
  );
}
