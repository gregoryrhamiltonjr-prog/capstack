# Site-wide usability and design audit — 2026-10-30

Prompted by the Course Map hover bug (Valuation disappearing). Goal: find the same class of
problem everywhere — content that moves, hides or lies depending on pointer/scroll — plus
general usability, accessibility and honesty issues. Live pages were reviewed in the signed-in
browser (desktop) and every route's source was read.

## Fixed in this release

### Same class as the hover bug
- **Course breakdown (`/course/[code]`)** still used CSS multi-columns (`columns-2` +
  `break-inside-avoid`), which split chapters across columns unpredictably. Replaced with the
  same stable `items-stretch` grid as the Course Map.
- **Pointer-driven wrappers** (`Tilt3D`, `MouseGlow`, `Magnetic`, `ScrubStagger`) removed from
  lessons, quizzes, games, polls and Social. `Magnetic` physically moved buttons toward the
  cursor (Check answer, Accept, Nudge); `MouseGlow` added a `group` class that made nested
  `group-hover` styles fire when hovering anywhere on the card.
- Leaderboard/Profile/Settings (earlier pass in this branch): particle fields, parallax and tilt
  removed.

### Learning flow
- Lesson completion was saved but **never loaded**: every reload showed "Mark complete" again and
  "0 done this session". Completion now persists (chapter page and course breakdown).
- "Next lesson" left the reader at the bottom of the new lesson. Lesson/tab changes now scroll
  to the top and move focus to the lesson heading; the URL (`?lesson=` / `?tab=quiz`) stays in
  sync so reload, share and back work.
- Breadcrumb went to the Course Map instead of the chapter's course. "Next chapter" dead-ended at
  the end of every unit; it now follows course order and names the destination.
- Locked quizzes were invisible with no explanation (header still said "8 quiz items"). Free
  Roam readers now see why the quiz is locked and that reading ahead earns no XP yet.
- Unknown chapter codes rendered a bare text page; they now 404 to a styled page with links.
- Terminology standardized on units → chapters → lessons (was "modules" in places).

### Quiz
- "Check answer" with nothing selected **counted as a wrong answer**. It is now disabled until
  an answer is given, with a hint explaining why.
- Choices are a proper radio group; numeric questions have a real label; Enter submits.
- Hint button assumed three hints; it now uses the question's actual hint count.
- Ordering: boundary up/down buttons disabled; labels name the item being moved.
- Result screen shows actual XP earned from the server, reports save failures with retry,
  offers "Next chapter" after a pass and "Review lessons" after a miss, and refreshes navigation.

### Social, onboarding, forms
- One-click "End" partnership now confirms and reads "End partnership".
- Raw IDs like `vp_plus` shown as career stage replaced with labels.
- Chat message box and attach button have accessible names; onboarding labels are associated
  with their fields and choice buttons expose their selected state; two-column fields stack on
  phones. Waitlist email field gets autocomplete and announces errors.

### Landing page
- On laptop-height screens (~675px) the hero overflowed its pinned 100svh frame: the "Private
  beta" badge was hidden under the sticky header and the SCROLL cue overlapped the stack.
  Headline/tower/spacing now scale with viewport height; the cue hides on short screens.
- The pinned hero consumed ~2.2 screens of text-free scrolling (headline and CTAs faded out,
  stack alone on screen). Pin distance halved (+=110%).
- Screen readers announced the headline letter by letter ("C L I M B…"). It now has a single
  readable accessible name.
- Non-clickable course rail cards lifted on hover as if they were links; lift removed.
- Fonts were loaded via a render-blocking `@import` from Google Fonts; now self-hosted.

## Flagged for Greg — not changed (content/product decisions)
- **Testimonials on the landing page are not from real users** (private beta, admin-only). Fake
  testimonials undermine trust and carry FTC risk. Recommend removing or replacing with real
  beta quotes.
- Landing copy claims features that don't exist yet: "proprietary screener", "four
  leaderboards", "school & company discovery", drag-and-drop CMBS waterfall builder;
  "Ready to make analyst by next Friday?" over-promises.
- Course 1 and its first chapter share the title "What is Commercial Real Estate?" — confusing in
  breadcrumbs and the map.
- Social shows seeded groups with 4–5 members though only admins can sign in.

## Not covered / still open
- Real phone and tablet testing, screen-reader pass, and cross-browser hover checks.
- Quiz grading is still trusted from the client (existing XP-integrity backlog item).
- Fresh sign-in, onboarding and subscribe flows not exercised end-to-end (no isolated staging).
