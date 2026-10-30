# Course-map hover stability — 2026-10-30

## Report
Greg reported that Valuation in the first CRE course disappeared while hovering The CRE Ecosystem. The live Course Map's document text contained both units; this was a presentation issue, not missing curriculum data.

## Diagnosis and fix
The existing map nested CSS multicolumn layout, full-height/break-inside wrappers, mouse-tracked 3D transforms, whole-map parallax and scroll-triggered opacity. This is a fragile combination of fragmented layout and composited/animated layers, consistent with cards vanishing or clipping during pointer movement. Exact pointer-induced compositor behavior was not reproduced by the browser tool (its inspection returned no pointer action), so do not claim an automated hover reproduction.

Replaced the map with a server-rendered CourseMapView:
- Normal responsive CSS grid, preserving curriculum reading order.
- No masonry fragmentation, 3D transforms, parallax, scroll opacity or full-height card wrappers.
- Hover changes only the hovered card's border and chapter-link colors.
- All units and chapter names remain in document flow, including locked units.
- Locked chapters are readable disabled text rather than fake hash links.
- Chapter/course destinations and progress gating are preserved; no data/schema changes.
- Current admin access is checked before loading course state.

## Regression coverage
Eight tests cover simultaneous Ecosystem/Valuation rendering, stable grid/no transform dependencies, unit order, chapter destinations, locked content, long/escaped titles, semantic labels and empty curricula. Run `npm run check` for the full suite and production build. This is structural/server-render coverage, not a substitute for cross-browser pointer interaction tests.

## Release verification
Require GitHub CI and Vercel preview build before merge. The preview still lacks isolated authentication, so authenticated map testing must use the authorized live session after rollout. Record exact deployed source, live card visibility and navigation separately in the release journal. Do not alter account/lesson data to test this fix.
