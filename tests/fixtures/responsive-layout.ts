import type { TrackState } from "../../src/lib/progress";
import type { DashboardViewProps } from "../../src/components/DashboardView";
import { dailyXpSeries } from "../../src/lib/dashboard";

// Synthetic data only: responsive tests never connect to an account or database.
export const layoutDashboard: DashboardViewProps = {
  name: "Sample Learner", xp: 240, streak: 3, weeklyGoal: 5, lessonsThisWeek: 2,
  unlockedCourses: 10, completedChapters: 2, totalChapters: 91,
  activity: dailyXpSeries([{ amount: 60, createdAt: new Date("2026-10-30T10:00:00Z") }], new Date("2026-10-30T12:00:00Z")),
  weekLabel: "Week of Oct 26",
  next: { title: "What is Commercial Real Estate?", objective: "Define CRE as an asset class and place it among the four quadrants of capital.", code: "T1.M1.1", course: "What is Commercial Real Estate?", lessons: 3 },
};

const unitTitles = ["The CRE Ecosystem", "NOI and the Operating Statement", "Valuation", "Debt and Equity Metrics", "Market Analysis", "Real Estate Risk", "The Investment Process", "Practice and Applications"];
export const layoutTrack: TrackState = {
  id: "layout-cre", code: "T1", realm: "cre", title: "What is Commercial Real Estate?",
  tagline: "The vocabulary and math everything else stands on.", tier: "Foundations 100", flagship: false,
  estHours: "12–14h", prereqTrackIds: [], unlocked: true, complete: false, progressPct: 0,
  modules: unitTitles.map((title, index) => ({
    id: `layout-unit-${index}`, code: `T1.M${index + 1}`, title,
    description: index % 2 ? "Build your foundation with worked numbers and practical examples." : "The people, decisions and financial concepts behind a commercial real estate deal, from the first assumptions to the final investment decision.",
    adaptive: false, difficultyTier: "Foundations 100", estHours: "1h", unlocked: true, complete: false,
    chapters: Array.from({ length: index % 2 ? 1 : 5 }, (_, chapter) => ({
      id: `layout-chapter-${index}-${chapter}`, code: `T1.M${index + 1}.${chapter + 1}`,
      title: chapter ? "Valuation, cash flows and the practical details behind an underwriting decision" : title === "Valuation" ? "Cap Rates" : `${title}: the foundations`,
      objective: "Understand the concept.", orderIndex: chapter, lessonCount: 3, questionCount: 5,
      status: "available", viewable: true, quizUnlocked: true, bestScorePct: 0, lessonsDone: 0,
      lessons: Array.from({ length: 3 }, (_, lesson) => ({ id: `layout-lesson-${index}-${chapter}-${lesson}`, title: lesson === 2 ? "NOI versus NCF — and why lenders underwrite net cash flow when sizing a senior loan" : `Worked example ${lesson + 1}`, orderIndex: lesson })),
    })),
  })),
};
