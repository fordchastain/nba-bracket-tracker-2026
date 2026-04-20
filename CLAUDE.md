# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # tsc type-check + Vite production build
npm run preview   # serve the production build locally
```

There are no tests or linter configured.

## Architecture

This is a React + TypeScript app (Vite) that scores a group NBA playoff bracket pool.

**Data flow:**

1. `src/data/brackets.json` — each participant's picks, typed as `UserBracket[]`
2. `src/data/actualResults.ts` — `ACTUAL_RESULTS: ActualResults`, updated manually as series complete (set `winner: null` for unplayed series)
3. `src/lib/scorer.ts` — `scoreBracket(user, actual)` computes a `ScoreBreakdown` and total; point values are 1/2/4/8 for R1/R2/Conf Finals/NBA Finals
4. `src/components/Leaderboard.tsx` — scores all brackets at module load time (outside the component), sorts by total, renders a table with expandable rows
5. `src/components/BracketBreakdown.tsx` — per-user drill-down showing correct/incorrect/pending status for every matchup

**Types** live in `types/bracket.ts` (outside `src/`). `ActualMatchup` uses `string | null` fields to represent unplayed series; `UserBracket` uses plain `string` since picks are always filled in.

**Updating results:** edit `src/data/actualResults.ts` — fill in `winner` strings as series finish. Second-round and later matchups also need `team1`/`team2` populated once the matchups are set.
