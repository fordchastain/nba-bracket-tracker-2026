import type { ActualResults } from '../../types/bracket';

// Set winner to null for any series that hasn't been decided yet.
// The scorer will award 0 points for TBD matchups and show them as pending in the UI.
export const ACTUAL_RESULTS: ActualResults = {
  east: {
    first: [
      {
        team1: 'Detroit Pistons',
        team2: 'Orlando Magic',
        winner: 'Detroit Pistons',
      },
      {
        team1: 'Cleveland Cavaliers',
        team2: 'Toronto Raptors',
        winner: 'Cleveland Cavaliers',
      },
      {
        team1: 'Boston Celtics',
        team2: 'Philadelphia 76ers',
        winner: 'Philadelphia 76ers',
      },
      {
        team1: 'New York Knicks',
        team2: 'Atlanta Hawks',
        winner: 'New York Knicks',
      },
    ],
    second: [
      {
        team1: 'Detroit Pistons',
        team2: 'Cleveland Cavaliers',
        winner: 'Cleveland Cavaliers',
      },
      {
        team1: 'New York Knicks',
        team2: 'Philadelphia 76ers',
        winner: 'New York Knicks',
      },
    ],
    finals: {
      team1: 'Cleveland Cavaliers',
      team2: 'New York Knicks',
      winner: 'New York Knicks',
    },
    champion: 'New York Knicks',
  },
  west: {
    first: [
      {
        team1: 'Oklahoma City Thunder',
        team2: 'Phoenix Suns',
        winner: 'Oklahoma City Thunder',
      },
      { team1: 'LA Lakers', team2: 'Houston Rockets', winner: 'LA Lakers' },
      {
        team1: 'San Antonio Spurs',
        team2: 'Portland Trail Blazers',
        winner: 'San Antonio Spurs',
      },
      {
        team1: 'Denver Nuggets',
        team2: 'Minnesota Timberwolves',
        winner: 'Minnesota Timberwolves',
      },
    ],
    second: [
      {
        team1: 'Oklahoma City Thunder',
        team2: 'LA Lakers',
        winner: 'Oklahoma City Thunder',
      },
      {
        team1: 'San Antonio Spurs',
        team2: 'Minnesota Timberwolves',
        winner: 'San Antonio Spurs',
      },
    ],
    finals: {
      team1: 'Oklahoma City Thunder',
      team2: 'San Antonio Spurs',
      winner: null,
    },
    champion: null,
  },
  finals: {
    champion: null,
    pointsTotal: null,
  },
};
