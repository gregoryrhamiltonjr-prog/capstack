# Learning-desk dashboard refresh — 2026-10-30

## Design
Keep CapStack's navy/brass identity, with a clearer visual hierarchy: a focused next-chapter card, four honest metrics, a readable seven-day activity chart, and weekly commitment/rank progress. Essential content is server-rendered and does not depend on pointer effects, scroll-triggered opacity, or animation hydration.

## Reliability and correctness
- Weekly lesson goal comes from the signed-in user's completed lesson records, from Monday 00:00 UTC through now. Removed hard-coded 70% progress and unconditional “On track.”
- Counted chapter passes are now called “Chapters cleared,” not “Modules passed.”
- Daily XP chart explicitly covers the last seven UTC days, fills inactive days, excludes future events, and exposes screen-reader text. No fabricated positive chart bars or activity.
- Removed a hard-coded estimated lesson duration; the next chapter shows its actual lesson count instead.
- Dashboard checks current admin access before querying learner data; independent queries run concurrently.
- Added route-level loading skeleton and recoverable error UI without exposing exception details.

## Accessibility and mobile
- Keyboard skip-to-content link and consistent visible focus indicators.
- Accessible progress values, labeled navigation landmarks and current-page state.
- Course Map remains active while viewing a course or lesson.
- Mobile settings entry, larger touch targets and bottom safe-area padding.
- Collapsed rank badge at narrow mobile widths to prevent header crowding.
- No essential animation; skeleton/hover movement honors reduced-motion preferences.

## Verification / limitations
- Fourteen new regression tests cover UTC week/year boundaries, real goal calculations, empty/completed dashboard states, server-rendered content, text escaping and route matching.
- Combined local suite (security, auth configuration, dashboard, finance, limiter): 35 passing tests; TypeScript and production build passed.
- Thirteen local HTTP smoke checks passed against the unconfigured loopback-only production build.
- No database schema/data changes. Existing completion timestamps are used as stored; the broader lesson-progress/XP integrity audit is still pending.
- Preview has no isolated auth/database configuration. Do not copy production credentials or learner data into it. Authenticated UI verification must be recorded separately after a safe authorized rollout, or when staging exists.
