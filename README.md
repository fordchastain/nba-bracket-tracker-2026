# NBA Bracket Tracker 2026

A React app for tracking and scoring NBA playoff bracket predictions against actual results.

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start local development server with hot reload |
| `npm run build`   | Compile TypeScript and bundle for production   |
| `npm run preview` | Preview the production build locally           |

---

## Deploy

The app is configured for GitHub Pages under the `/nba-bracket-tracker-2026/` base path (set in [vite.config.ts](vite.config.ts)).

```bash
npm run deploy
```

This runs `npm run build` first (via the `predeploy` script), then pushes the `dist/` folder to the `gh-pages` branch using the `gh-pages` package. GitHub Pages must be configured to serve from that branch in the repo settings.

---

## How Scoring Works

Each correct pick earns points based on the round. Later rounds are worth more.

| Round                    | Points per Correct Pick | Max Points |
| ------------------------ | ----------------------- | ---------- |
| First Round (East)       | 1                       | 4          |
| First Round (West)       | 1                       | 4          |
| Second Round (East)      | 2                       | 4          |
| Second Round (West)      | 2                       | 4          |
| Conference Finals (East) | 4                       | 4          |
| Conference Finals (West) | 4                       | 4          |
| NBA Finals Champion      | 8                       | 8          |
| **Total**                |                         | **32**     |

A pick only scores if the exact winner matches. Matchups that haven't been decided yet show as TBD and award 0 points until the series concludes.

---

## Adding / Updating Brackets

**Player brackets** are stored in [src/data/brackets.json](src/data/brackets.json). Each entry follows this shape:

```json
{
  "name": "Player Name",
  "eastFirst": [
    { "team1": "Boston Celtics", "team2": "Miami Heat", "winner": "Boston Celtics" }
  ],
  "eastSecond": [...],
  "eastFinals": [...],
  "westFirst": [...],
  "westSecond": [...],
  "westFinals": [...],
  "champion": "Boston Celtics"
}
```

**Actual results** are updated in [src/data/actualResults.ts](src/data/actualResults.ts). Set `winner` to the winning team name once a series is complete, or leave it `null` for pending matchups.

---

## Project Structure

```
src/
  components/
    Leaderboard.tsx       # Ranked list of all players
    BracketBreakdown.tsx  # Per-player round-by-round scoring detail
  data/
    brackets.json         # All player bracket submissions
    actualResults.ts      # Live tournament results
  lib/
    scorer.ts             # Scoring logic
data/
  teams.ts                # 16 playoff teams with seeds and conferences
types/
  bracket.ts              # TypeScript interfaces
```

---

## UI Overview

- **Leaderboard** — all players ranked by total score with a progress bar (out of 32).
- **Details panel** — expand any player to see a round-by-round breakdown.
  - Green = correct pick
  - Red = incorrect pick (shows actual winner)
  - Gray = pending / TBD
