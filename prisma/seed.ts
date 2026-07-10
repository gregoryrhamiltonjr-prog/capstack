import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ALL_TRACKS } from "../src/content";
import { weekKey } from "../src/lib/util";

const db = new PrismaClient();

async function wipe() {
  // order matters for FK constraints
  await db.message.deleteMany();
  await db.groupMember.deleteMany();
  await db.studyGroup.deleteMany();
  await db.channel.deleteMany();
  await db.connection.deleteMany();
  await db.xpEvent.deleteMany();
  await db.quizAttempt.deleteMany();
  await db.chapterProgress.deleteMany();
  await db.lessonProgress.deleteMany();
  await db.glossaryTerm.deleteMany();
  await db.quizQuestion.deleteMany();
  await db.lesson.deleteMany();
  await db.chapter.deleteMany();
  await db.module.deleteMany();
  await db.track.deleteMany();
  await db.user.deleteMany();
}

async function seedCurriculum() {
  let trackOrder = 0;
  for (const t of ALL_TRACKS) {
    await db.track.create({
      data: {
        id: t.id,
        realm: t.realm,
        code: t.code,
        title: t.title,
        tagline: t.tagline,
        description: t.description,
        tier: t.tier,
        difficulty: t.difficulty,
        estHours: t.estHours,
        orderIndex: t.orderIndex ?? trackOrder++,
        flagship: t.flagship ?? false,
        prereqTrackIds: JSON.stringify(t.prereqTrackIds ?? []),
      },
    });

    let modOrder = 0;
    for (const m of t.modules) {
      await db.module.create({
        data: {
          id: m.code,
          trackId: t.id,
          code: m.code,
          title: m.title,
          description: m.description,
          estHours: m.estHours,
          difficultyTier: m.difficultyTier,
          adaptive: m.adaptive ?? false,
          orderIndex: modOrder++,
          prereqModuleIds: JSON.stringify(m.prereqModuleCodes ?? []),
        },
      });

      let chOrder = 0;
      for (const c of m.chapters) {
        await db.chapter.create({
          data: {
            id: c.code,
            moduleId: m.code,
            code: c.code,
            title: c.title,
            objective: c.objective,
            orderIndex: chOrder++,
            stageCallouts: JSON.stringify(c.stageCallouts ?? {}),
          },
        });

        let lOrder = 0;
        for (const l of c.lessons) {
          await db.lesson.create({
            data: {
              id: `${c.code}#${lOrder}`,
              chapterId: c.code,
              title: l.title,
              orderIndex: lOrder,
              readMinutes: l.readMinutes ?? 5,
              blocks: JSON.stringify(l.blocks),
            },
          });
          lOrder++;
        }

        let qOrder = 0;
        for (const q of c.quiz) {
          await db.quizQuestion.create({
            data: {
              id: `${c.code}Q${qOrder}`,
              chapterId: c.code,
              type: q.type,
              prompt: q.prompt,
              data: JSON.stringify(q.data),
              explanation: q.explanation,
              hints: JSON.stringify(q.hints),
              orderIndex: qOrder,
            },
          });
          qOrder++;
        }

        for (const g of c.glossary ?? []) {
          await db.glossaryTerm.create({
            data: { term: g.term, definition: g.definition, chapterId: c.code },
          });
        }
      }
    }
  }
}

async function seedUsers() {
  const pw = await bcrypt.hash("climbthestack", 10);
  const wk = weekKey();

  const demo = await db.user.create({
    data: {
      email: "demo@capstack.app",
      passwordHash: pw,
      displayName: "Demo Analyst",
      avatarColor: "#10B981",
      careerStage: "analyst",
      jobArea: "agency_am",
      weeklyGoal: 5,
      startingRealm: "cre",
      guidedPath: "agency_fast_track",
      school: "UNC Kenan-Flagler",
      company: "Wells Fargo",
      xp: 2140,
      currentStreak: 6,
      longestStreak: 11,
      lastActiveDay: null,
      onboarded: true,
      // Active membership so the demo login skips the paywall when Stripe is enabled.
      subscriptionStatus: "active",
      currentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  // A cohort for leaderboards / discovery / social
  const cohort: { name: string; xp: number; streak: number; school: string; company: string; stage: string; area: string; color: string }[] = [
    { name: "Priya Nair", xp: 6820, streak: 21, school: "Wharton", company: "Blackstone", stage: "associate", area: "repe", color: "#F5B301" },
    { name: "Marcus Webb", xp: 4510, streak: 9, school: "UNC Kenan-Flagler", company: "Wells Fargo", stage: "analyst", area: "agency_production", color: "#3B82F6" },
    { name: "Sofia Delgado", xp: 3880, streak: 14, school: "NYU Stern", company: "Walker & Dunlop", stage: "analyst", area: "agency_am", color: "#34D399" },
    { name: "Jordan Kim", xp: 3120, streak: 4, school: "UNC Kenan-Flagler", company: "Wells Fargo", stage: "student", area: "student_undecided", color: "#EF4444" },
    { name: "Aisha Rahman", xp: 9450, streak: 33, school: "Harvard", company: "KKR", stage: "vp_plus", area: "levfin_private_credit", color: "#F5B301" },
    { name: "Ben Alvarez", xp: 1760, streak: 3, school: "USC Marshall", company: "CBRE", stage: "analyst", area: "cmbs", color: "#8B5CF6" },
    { name: "Chloe Fontaine", xp: 2890, streak: 7, school: "NYU Stern", company: "Freddie Mac", stage: "associate", area: "agency_am", color: "#14B8A6" },
    { name: "Diego Santos", xp: 5230, streak: 12, school: "Wharton", company: "Eastdil Secured", stage: "associate", area: "brokerage", color: "#F97316" },
  ];

  const users = [demo];
  for (const c of cohort) {
    const u = await db.user.create({
      data: {
        email: c.name.toLowerCase().replace(/[^a-z]+/g, ".") + "@capstack.app",
        passwordHash: pw,
        displayName: c.name,
        avatarColor: c.color,
        careerStage: c.stage,
        jobArea: c.area,
        school: c.school,
        company: c.company,
        xp: c.xp,
        currentStreak: c.streak,
        longestStreak: c.streak + 5,
        onboarded: true,
      },
    });
    users.push(u);
    // weekly xp events so the weekly leaderboard has data
    await db.xpEvent.create({
      data: { userId: u.id, amount: Math.round(c.xp * 0.18), reason: "weekly activity", weekKey: wk },
    });
  }
  await db.xpEvent.create({ data: { userId: demo.id, amount: 380, reason: "weekly activity", weekKey: wk } });

  // Connections: demo <-> Marcus (accepted friend), demo <-> Sofia (accountability partner), Jordan -> demo (pending partner)
  const marcus = users.find((u) => u.displayName === "Marcus Webb")!;
  const sofia = users.find((u) => u.displayName === "Sofia Delgado")!;
  const jordan = users.find((u) => u.displayName === "Jordan Kim")!;
  const priya = users.find((u) => u.displayName === "Priya Nair")!;
  const ben = users.find((u) => u.displayName === "Ben Alvarez")!;
  const chloe = users.find((u) => u.displayName === "Chloe Fontaine")!;
  await db.connection.create({ data: { requesterId: demo.id, addresseeId: marcus.id, status: "accepted" } });
  await db.connection.create({ data: { requesterId: demo.id, addresseeId: sofia.id, status: "accepted", isPartner: true } });
  await db.connection.create({ data: { requesterId: jordan.id, addresseeId: demo.id, status: "pending", isPartner: true } });

  // DM channel demo <-> Sofia (deterministic key)
  const dmKey = ["dm", ...[demo.id, sofia.id].sort()].join(":");
  const dm = await db.channel.create({ data: { kind: "dm", name: dmKey } });
  const now = Date.now();
  const msgs: [string, string, number][] = [
    [sofia.id, "yo did you finish the DUS loss-sharing chapter? that first-loss math is brutal", 1000 * 60 * 60 * 20],
    [demo.id, "just did. the $25M example finally made it click — lender eats the first 5% then a tier above", 1000 * 60 * 60 * 19],
    [sofia.id, "same. quiz me on pari passu before our 1:1 tmrw?", 1000 * 60 * 60 * 2],
    [demo.id, "bet. 1/3 lender 2/3 fannie from dollar one. locked in", 1000 * 60 * 30],
  ];
  for (const [sid, body, ago] of msgs) {
    await db.message.create({
      data: { channelId: dm.id, senderId: sid, body, createdAt: new Date(now - ago) },
    });
  }

  // Groups: one owned by demo + discoverable ones
  async function makeGroup(name: string, description: string, ownerId: string, memberIds: string[]) {
    const channel = await db.channel.create({ data: { kind: "group", name: `group:${name}` } });
    const group = await db.studyGroup.create({
      data: { name, description, ownerId, channelId: channel.id },
    });
    await db.channel.update({ where: { id: channel.id }, data: { groupId: group.id } });
    for (const uid of memberIds) {
      await db.groupMember.create({
        data: { groupId: group.id, userId: uid, role: uid === ownerId ? "owner" : "member" },
      });
    }
    return group;
  }

  const dus = await makeGroup(
    "DUS Desk Crew",
    "Agency AM analysts grinding the flagship track together.",
    demo.id,
    [demo.id, sofia.id, marcus.id, chloe.id]
  );
  await db.message.create({
    data: {
      channelId: dus.channelId!,
      senderId: sofia.id,
      body: "Welcome — drop your weekly goal here so we can keep each other honest.",
      createdAt: new Date(now - 1000 * 60 * 60 * 5),
    },
  });
  await db.message.create({
    data: {
      channelId: dus.channelId!,
      senderId: demo.id,
      body: "Locked in: 5 lessons this week. Who's on T3?",
      createdAt: new Date(now - 1000 * 60 * 60 * 4),
    },
  });

  await makeGroup(
    "REPE Interview Prep",
    "Technicals, deal walkthroughs, and mock superdays for buy-side.",
    priya.id,
    [priya.id, marcus.id, demo.id]
  );
  await makeGroup(
    "CMBS & Structured",
    "Waterfalls, B-pieces, and special servicing — weekly problem sets.",
    ben.id,
    [ben.id, priya.id, chloe.id]
  );
  await makeGroup(
    "Agency Lenders Network",
    "DUS / Freddie production and AM. Open to all GSE-side folks.",
    chloe.id,
    [chloe.id, sofia.id, marcus.id, jordan.id]
  );
  await makeGroup(
    "Summer '26 IB Desk",
    "Summer analysts prepping for full-time — accounting + LBO drills.",
    jordan.id,
    [jordan.id, ben.id]
  );

  return demo;
}

async function main() {
  console.log("Wiping…");
  await wipe();
  console.log("Seeding curriculum…");
  await seedCurriculum();
  console.log("Seeding users & social…");
  await seedUsers();

  const counts = {
    tracks: await db.track.count(),
    modules: await db.module.count(),
    chapters: await db.chapter.count(),
    lessons: await db.lesson.count(),
    questions: await db.quizQuestion.count(),
    glossary: await db.glossaryTerm.count(),
    users: await db.user.count(),
  };
  console.log("Done:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
