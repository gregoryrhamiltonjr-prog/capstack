import { db } from "./db";
import { parseJSON } from "./util";

export type ChapterState = {
  id: string;
  code: string;
  title: string;
  objective: string;
  orderIndex: number;
  lessonCount: number;
  questionCount: number;
  status: "locked" | "available" | "in_progress" | "passed" | "tested_out";
  viewable: boolean; // can open lessons (available, or free-roam)
  quizUnlocked: boolean; // can take the graded quiz
  bestScorePct: number;
  lessonsDone: number;
};

export type ModuleState = {
  id: string;
  code: string;
  title: string;
  description: string;
  adaptive: boolean;
  difficultyTier: string;
  estHours: string;
  unlocked: boolean;
  complete: boolean;
  chapters: ChapterState[];
};

export type TrackState = {
  id: string;
  code: string;
  realm: string;
  title: string;
  tagline: string;
  tier: string;
  flagship: boolean;
  estHours: string;
  prereqTrackIds: string[];
  unlocked: boolean;
  complete: boolean;
  progressPct: number;
  modules: ModuleState[];
};

export async function getCourseState(userId: string, freeRoam: boolean): Promise<TrackState[]> {
  const tracks = await db.track.findMany({
    orderBy: { orderIndex: "asc" },
    include: {
      modules: {
        orderBy: { orderIndex: "asc" },
        include: {
          chapters: {
            orderBy: { orderIndex: "asc" },
            include: { _count: { select: { lessons: true, questions: true } } },
          },
        },
      },
    },
  });

  const chapProg = await db.chapterProgress.findMany({ where: { userId } });
  const progByChap = new Map(chapProg.map((c) => [c.chapterId, c]));
  const lessProg = await db.lessonProgress.findMany({ where: { userId } });
  const doneLessonsByChap = new Map<string, number>();
  for (const lp of lessProg) {
    if (lp.status === "completed" || lp.status === "tested_out") {
      const chapterCode = lp.lessonId.split("#")[0];
      doneLessonsByChap.set(chapterCode, (doneLessonsByChap.get(chapterCode) ?? 0) + 1);
    }
  }

  const isPassed = (code: string) => {
    const s = progByChap.get(code)?.status;
    return s === "passed" || s === "tested_out";
  };

  // Which seeded chapters exist (to avoid requiring unseeded prereqs)
  const allChapterCodes = new Set<string>();
  for (const t of tracks) for (const m of t.modules) for (const c of m.chapters) allChapterCodes.add(c.code);

  const trackComplete = (t: (typeof tracks)[number]) => {
    const codes = t.modules.flatMap((m) => m.chapters.map((c) => c.code));
    return codes.length > 0 && codes.every(isPassed);
  };
  const completeByTrack = new Map(tracks.map((t) => [t.id, trackComplete(t)]));

  const moduleComplete = (m: (typeof tracks)[number]["modules"][number]) =>
    m.chapters.length > 0 && m.chapters.every((c) => isPassed(c.code));

  const result: TrackState[] = tracks.map((t) => {
    const prereqTrackIds = parseJSON<string[]>(t.prereqTrackIds, []);
    const realTrackUnlocked =
      prereqTrackIds.filter((id) => tracks.some((x) => x.id === id)).every((id) => completeByTrack.get(id)) ||
      prereqTrackIds.length === 0;
    const trackUnlocked = freeRoam || realTrackUnlocked;

    let passedCount = 0;
    let totalChapters = 0;

    const modules: ModuleState[] = t.modules.map((m) => {
      const prereqModuleCodes = parseJSON<string[]>(m.prereqModuleIds, []).filter((code) =>
        tracks.some((x) => x.modules.some((mm) => mm.code === code))
      );
      const prereqsDone = prereqModuleCodes.every((code) => {
        const mod = tracks.flatMap((x) => x.modules).find((mm) => mm.code === code);
        return mod ? moduleComplete(mod) : true;
      });
      const realModUnlocked = realTrackUnlocked && prereqsDone;
      const modUnlocked = freeRoam || realModUnlocked;

      let prevPassed = true; // first chapter gate
      const chapters: ChapterState[] = m.chapters.map((c) => {
        totalChapters++;
        const prog = progByChap.get(c.code);
        const passed = isPassed(c.code);
        if (passed) passedCount++;
        const available = realModUnlocked && prevPassed;
        const quizUnlocked = available; // graded quiz follows the real gate
        const viewable = available || freeRoam;

        let status: ChapterState["status"];
        if (prog?.status === "tested_out") status = "tested_out";
        else if (prog?.status === "passed") status = "passed";
        else if (available && (prog?.status === "in_progress" || (doneLessonsByChap.get(c.code) ?? 0) > 0)) status = "in_progress";
        else if (available || freeRoam) status = "available";
        else status = "locked";

        const state: ChapterState = {
          id: c.id,
          code: c.code,
          title: c.title,
          objective: c.objective,
          orderIndex: c.orderIndex,
          lessonCount: c._count.lessons,
          questionCount: c._count.questions,
          status,
          viewable,
          quizUnlocked,
          bestScorePct: prog?.bestScorePct ?? 0,
          lessonsDone: doneLessonsByChap.get(c.code) ?? 0,
        };
        // next chapter in module is gated on this one passing; free roam only affects viewing.
        prevPassed = passed;
        return state;
      });

      return {
        id: m.id,
        code: m.code,
        title: m.title,
        description: m.description,
        adaptive: m.adaptive,
        difficultyTier: m.difficultyTier,
        estHours: m.estHours,
        unlocked: modUnlocked,
        complete: moduleComplete(m),
        chapters,
      };
    });

    return {
      id: t.id,
      code: t.code,
      realm: t.realm,
      title: t.title,
      tagline: t.tagline,
      tier: t.tier,
      flagship: t.flagship,
      estHours: t.estHours,
      prereqTrackIds,
      unlocked: trackUnlocked,
      complete: completeByTrack.get(t.id) ?? false,
      progressPct: totalChapters ? Math.round((passedCount / totalChapters) * 100) : 0,
      modules,
    };
  });

  return result;
}

// The next actionable chapter across both realms (for the "continue" rail).
export function findNextChapter(tracks: TrackState[]): { track: TrackState; module: ModuleState; chapter: ChapterState } | null {
  // Prefer in_progress, then available.
  for (const pref of ["in_progress", "available"] as const) {
    for (const track of tracks) {
      for (const module of track.modules) {
        for (const chapter of module.chapters) {
          if (chapter.status === pref) return { track, module, chapter };
        }
      }
    }
  }
  return null;
}
