// Pure dashboard calculations. All activity windows are explicitly UTC.
export type XpActivity = { amount: number; createdAt: Date };
export type ActivityDay = { key: string; label: string; xp: number; today: boolean };
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function startOfUtcDay(now: Date): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function startOfUtcWeek(now: Date): Date {
  const start = startOfUtcDay(now);
  start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
  return start;
}

export function activityWindowStart(now: Date): Date {
  const start = startOfUtcDay(now);
  start.setUTCDate(start.getUTCDate() - 6);
  return start;
}

export function dailyXpSeries(events: XpActivity[], now: Date): ActivityDay[] {
  const start = activityWindowStart(now);
  const today = startOfUtcDay(now).toISOString().slice(0, 10);
  const series = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + index);
    const key = date.toISOString().slice(0, 10);
    return { key, label: DAYS[date.getUTCDay()], xp: 0, today: key === today };
  });
  const byKey = new Map(series.map((day) => [day.key, day]));
  for (const event of events) {
    if (!Number.isFinite(event.amount) || event.createdAt > now) continue;
    const day = byKey.get(event.createdAt.toISOString().slice(0, 10));
    if (day) day.xp += event.amount;
  }
  return series;
}

export function weeklyGoalProgress(completed: number, target: number) {
  const count = Number.isFinite(completed) ? Math.max(0, Math.floor(completed)) : 0;
  const goal = Number.isFinite(target) && target > 0 ? Math.max(1, Math.floor(target)) : 5;
  const remaining = Math.max(0, goal - count);
  return {
    completed: count,
    target: goal,
    remaining,
    pct: Math.min(100, Math.round((count / goal) * 100)),
    reached: remaining === 0,
  };
}
