// Single XP ladder — 12 ranks. Formula pinned by spec:
// XP required to ADVANCE PAST level N = 500 * N * (N+1) / 2.
// Prospect is the 0-XP entry rank; Rainmaker (12) caps at 33,000 XP.

export const RANKS = [
  "Prospect",
  "Summer Intern",
  "Analyst",
  "Senior Analyst",
  "Associate",
  "Senior Associate",
  "VP",
  "Senior VP",
  "Director",
  "Managing Director",
  "Partner",
  "Rainmaker",
] as const;

export type Rank = (typeof RANKS)[number];

// XP threshold to leave level N (N = 1..11)
export function advanceThreshold(n: number): number {
  return Math.round((500 * n * (n + 1)) / 2);
}

export function levelForXp(xp: number): number {
  let level = 1;
  for (let n = 1; n <= 11; n++) {
    if (xp >= advanceThreshold(n)) level = n + 1;
    else break;
  }
  return Math.min(level, 12);
}

export function rankForXp(xp: number): Rank {
  return RANKS[levelForXp(xp) - 1];
}

// Gold prestige reserved for Managing Director+ (levels 10-12)
export function isPrestige(level: number): boolean {
  return level >= 10;
}

export function levelProgress(xp: number) {
  const level = levelForXp(xp);
  const floor = level <= 1 ? 0 : advanceThreshold(level - 1);
  const ceil = level >= 12 ? advanceThreshold(11) : advanceThreshold(level);
  const span = Math.max(1, ceil - floor);
  const into = Math.max(0, xp - floor);
  return {
    level,
    rank: RANKS[level - 1],
    prestige: isPrestige(level),
    xpIntoLevel: into,
    xpForLevel: span,
    xpToNext: level >= 12 ? 0 : ceil - xp,
    pct: level >= 12 ? 100 : Math.min(100, Math.round((into / span) * 100)),
    nextRank: level >= 12 ? null : RANKS[level],
  };
}

// XP awards
export const XP = {
  lesson: 20,
  chapterPass: 120,
  quizPerCorrect: 15,
  placementBonus: 0, // test-out grants no XP by spec
  streakDay: 10,
};

// Hint multipliers by tier used (1,2,3) → applied to a question's XP
export const HINT_MULT = [1, 0.75, 0.5, 0.25];
