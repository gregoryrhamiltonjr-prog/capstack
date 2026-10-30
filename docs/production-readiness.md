# Production readiness — first Otto pass

Date: 2026-10-30. Owner: Greg. Live site: https://learncapstack.com.

**Status: preparation only, not ready to certify for public production.** The source consolidation is partial. Nothing in this pass was deployed or pushed to GitHub. No production database, Stripe account, user data, or hosting configuration was changed.

## Provenance
- Cloned `https://github.com/gregoryrhamiltonjr-prog/capstack` into Otto's `capstack/` workspace directory.
- Baseline: `main` commit `5f51593` (2026-07-18); repository has only main. GitHub latest does not prove it matches current deployment or other devices.
- Working branch: `otto/production-readiness-2026-10-30`.
- Full recursive filename inventory of the owner's `hamilton-workspace` repo returned no Capstack paths; no unrelated code was imported.
- Live landing, authenticated dashboard and Course Map reviewed read-only. Dashboard showed private account access and Course Map showed five CRE and five High Finance courses. No lessons completed or account data changed.
- See adjacent `../capstack-hub/README.md` for other-source intake and consolidation rules. Other AI services/devices have not yet been named or imported.

## Changes
1. Updated compatible locked dependencies using `npm audit fix` without `--force`, without executing package lifecycle scripts. Next.js 16.2.10 → 16.4.3; next-auth 5.0.0-beta.31 → beta.32; Auth core 0.41.2 → 0.41.3; Prisma auth adapter 2.11.2 → 2.11.3; associated affected transitive packages updated. Prisma remains 5.22.0; React remains 19.2.7. Consult git diff/package-lock for the complete inventory.
2. Retired `/api/fix-title` and `/api/upsert-curriculum`. Previously these performed authenticated database writes on GET requests and trusted an admin claim from the session. GET and POST now return 410/no-store with no database or authentication dependencies. Other unsupported methods retain framework defaults. Existing operator scripts remain available, but were **not** run. No application callers were found by filename/content review.
3. Added a current-user/admin check directly before the private waitlist query, in addition to the parent-layout guard. Marked the page force-dynamic. Next.js can render layouts and pages concurrently, so layout-only guards should not be the sole data-access boundary. This also removes the build-time waitlist query observed in the baseline build.
4. Added sixteen regression tests covering financial calculations, rate-limit behavior and the retired maintenance endpoints.
5. Added `test`, `test:smoke`, `typecheck`, and `check` npm scripts, plus a GitHub Actions build/test/audit workflow. Workflow has been authored locally, not executed on GitHub.
6. Added a local-only read-only HTTP smoke script, fixed to 127.0.0.1:3100 to prevent accidental live probes.

## Verified results on Otto
- Runtime: Node 22.23.2; npm 10.9.8.
- `npm test`: **16/16 passed**.
- `npm run typecheck`: **passed**.
- `npm run build`: **passed** on Next.js 16.4.3, including TypeScript and route generation. No production DB or auth credentials were configured for the build. No waitlist query error after the guard/dynamic-render change.
- `npm audit --include=dev --audit-level=moderate`: **0 known vulnerabilities** at time of check. Baseline production-only audit reported ten affected package entries (four critical, four high, two moderate); package counts are not exploit counts. A clean audit is not a security certification and does not prove applicability/non-applicability of each advisory to the live deployment.
- `node scripts/smoke-local.mjs`: **10/10 passed** against a loopback-only production server. Landing/login/robots/sitemap returned 200; GET/POST maintenance routes returned 410/no-store; anonymous dashboard/admin waitlist requests redirected to login.
- Smoke tests deliberately ran with no AUTH_SECRET or DATABASE_URL. Auth.js logged MissingSecret and access failed closed. These tests do **not** establish authenticated sessions, DB behavior, mobile login or OAuth work in the patched version. Those need staging credentials entered through a secure supported flow.

## Reproduce locally without touching production
```sh
npm ci --include=dev
npm run check
npm audit --include=dev --audit-level=moderate
# Optional, in a separate terminal after the build:
npm run start -- --hostname 127.0.0.1 --port 3100
# Then:
npm run test:smoke
```
Do not copy production secrets into chat, scripts or shell commands. Do not run `setup`, `db:reset`, schema pushes or seed scripts against an existing database as part of these checks.

## Open blockers / follow-up priorities
- **Missing versions:** collect Greg's AI-service and device exports before choosing a canonical merged source.
- **Deployment provenance:** verify Vercel project's connected repository, deployed commit and staging setup. No assumption that live matches July source.
- **Lint:** `npm run lint` still invokes removed `next lint` and fails. Replace with an ESLint CLI/configuration and triage legacy findings in a separate change. Current `check`/CI explicitly cover tests/typecheck/build, not ESLint.
- **Persistent uploads:** avatar/chat upload code writes to `public/uploads` at runtime; unsuitable for ephemeral/read-only Vercel execution. Choose persistent object storage, validate upload contents and enforce access controls before reopening social uploads.
- **Authentication:** staging-test credentials/Google/Apple after dependency changes; review dangerous email account linking and provider email verification; add distributed login throttling across all web/mobile entry points. Existing rate limiter is process-local and currently used for waitlist, not comprehensive login protection.
- **Learning integrity:** server actions accept client-supplied progress/hint/prerequisite flags; audit server-side validation, grading, XP awards and transaction/idempotency behavior before admitting untrusted learners.
- **Data operations:** no migrations folder observed; verify migration strategy, production backups, restore test, rollback plan and whether any seed/demo data must be removed safely.
- **Billing:** run Stripe test-mode trial/subscription/cancellation/retry/duplicate and out-of-order webhook tests; verify live pricing and payment scope before enabling sales. Do not silently enable public signup or billing.
- **Quality:** automated authenticated journey tests, accessibility and mobile review, error reporting, performance budgets, privacy/terms, testimonial and marketing-claim verification remain open.
- **Framework warning:** middleware convention is deprecated; migrate to proxy in an isolated tested change.

## Release gate
Before any deployment: review this branch against all recovered sources, test against isolated staging data, verify backups/rollback, resolve launch blockers, and obtain Greg's deployment approval. Never use destructive reset commands to deploy.
