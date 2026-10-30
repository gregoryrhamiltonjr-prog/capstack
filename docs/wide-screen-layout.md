# Wide-screen workspace — 2026-10-30

## Report and change
Greg's large-iMac screenshot showed the app as a narrow centered island. The outer signed-in layout was capped at 1400px, and the dashboard/course views had additional nested max-widths.

- Remove the app-shell cap and anchor the sidebar to the edge of the available page.
- Dashboard, Course Map and course breakdown now fill the remaining workspace, with responsive padding rather than a second fixed-width box.
- Course grids retain equal-height cards and expand from one/two columns to three at 1800px and four at 2400px viewport widths. No tilt, parallax, masonry or opacity effects were reintroduced.
- Leaderboard, profile and Social get wider large-screen limits; lesson reading and settings retain intentional readable widths rather than stretching prose across the monitor.
- No account, progress, curriculum data, billing, authentication or database-schema changes. The separate production curriculum-load blocker is not changed by this release.

## Verification
- 68 regression tests, TypeScript and production build passed locally.
- Fifteen isolated Chromium geometry checks: actual dashboard/map/course components, actual built CSS/fonts and actual shell/sidebar class names, with synthetic data only. No live account, browser profile or database was used, and non-local network requests were blocked.
- Widths: 390, 1280, 1920, 2560 and 3440 CSS pixels. All three views fill the available workspace without horizontal overflow. Course cards align within rows; hovering Ecosystem does not move or hide the Valuation fixture.
- At 2560px the workspace is 2224px wide (remaining space is the 240px sidebar plus 48px left/right padding), rather than being capped at the old 1152px dashboard width inside the 1400px shell.
- A synthetic 2560px dashboard screenshot was inspected. This does not substitute for a physical iMac/Safari test or all authenticated UI states.

## Reproduce
```sh
npm ci --include=dev
npm run check
npm run test:layout
```
The layout script uses installed Chromium (`CHROMIUM_PATH`, `/usr/bin/chromium`, or `/usr/bin/google-chrome`) and serves only compiled static assets/synthetic component fixtures on loopback. Screenshots are saved under ignored `test-results/responsive/`. CI runs the geometry check after the production build.
