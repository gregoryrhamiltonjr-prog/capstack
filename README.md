# CapStack

Climb the whole capital stack. Interactive learning for commercial real estate and high finance — institutional content, widgets, quizzes, gamified progression, and a social layer (groups, DMs, accountability partners).

## Live production

**https://learncapstack.com** (alias: https://capstack-sage.vercel.app)

- **Email credentials login** — available to the provisioned admin
- **Private access** — public signup is disabled; only a provisioned admin can enter the app
- **Public waitlist** — visitors can register interest from the landing page
- **Google & Apple** — wired in; enable by adding OAuth keys (see below)
- **Postgres** — Neon
- **Hosting** — Vercel

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Prisma** + **Postgres** (Neon in production)
- **Auth.js** — email credentials + Google + Apple providers
- **Stripe** — subscriptions ($12.99/mo, 3-day trial)
- **Tailwind CSS**, **Framer Motion**, **GSAP**, **Recharts**

## Quick start (local)

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env
# Set AUTH_SECRET (openssl rand -base64 32)
# Set DATABASE_URL to Postgres (local Docker or Neon)
# Set ADMIN_EMAIL and a unique ADMIN_PASSWORD (12+ characters)

# 3. Database + seed demo data
npx prisma db push
npm run db:seed

# 4. Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Development server                               |
| `npm run build`   | Prisma generate + production build               |
| `npm run start`   | Serve production build                           |
| `npm run setup`   | Generate client, reset DB, seed curriculum/users |
| `npm run db:push` | Apply Prisma schema                              |
| `npm run db:seed` | Seed curriculum, admin, and demo cohort           |
| `npm run db:reset`| Force-reset DB and re-seed                       |
| `npm run admin:provision` | Safely create or promote the configured admin |

## Auth: Google & Apple setup

Credentials login works after the admin is provisioned. To enable **Google** and **Apple** buttons in production:

### Google

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → create OAuth client (Web).
2. Authorized JavaScript origins: `https://learncapstack.com`
3. Authorized redirect URI: `https://learncapstack.com/api/auth/callback/google`
4. In Vercel project env (Production):

   ```
   AUTH_GOOGLE_ID=...
   AUTH_GOOGLE_SECRET=...
   ```

5. Redeploy.

### Apple

1. Apple Developer → Identifiers → Services ID with Sign in with Apple.
2. Return URL: `https://learncapstack.com/api/auth/callback/apple`
3. Create a key + JWT client secret (Auth.js docs: Apple provider).
4. In Vercel:

   ```
   AUTH_APPLE_ID=...
   AUTH_APPLE_SECRET=...
   ```

5. Redeploy.

### Required core env (already set on Vercel)

```
AUTH_SECRET=...
AUTH_URL=https://learncapstack.com
NEXTAUTH_URL=https://learncapstack.com   # alias accepted by Auth.js
DATABASE_URL=postgresql://...   # Neon
ADMIN_EMAIL=you@example.com     # used by the one-off provisioning command
```

OAuth redirect URIs must use the **canonical domain** (`learncapstack.com`), not the
`*.vercel.app` alias. Google/Apple console entries:

```
https://learncapstack.com/api/auth/callback/google
https://learncapstack.com/api/auth/callback/apple
```

After applying the schema to an existing database, provision the owner without
wiping any data:

```bash
npx prisma db push
ADMIN_EMAIL=you@example.com npm run admin:provision
```

Set `ADMIN_PASSWORD` for credentials login, or omit it when the provisioned
email will use Google or Apple OAuth.

## Subscription (Stripe)

CapStack includes a subscription gate: **$12.99/month with a 3-day free trial**. During the current private-access phase, admins bypass that gate. When member access is reopened, **Free Roam mode is locked during the trial** and activates once the plan converts to paid.

Billing is enforced **only when `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are set**. With them blank, the billing gate stays disabled; the private admin gate still applies.

Setup:

1. Stripe Dashboard → **Products** → create a recurring price of **$12.99 / month**. Copy its price ID (`price_...`).
2. Add a webhook endpoint at `https://learncapstack.com/api/stripe/webhook`, subscribing to `checkout.session.completed` and `customer.subscription.*`. Copy the signing secret (`whsec_...`).
3. Set env (Vercel + local `.env`):

   ```
   STRIPE_SECRET_KEY=sk_live_...      # sk_test_... locally
   STRIPE_PRICE_ID=price_...          # the $12.99/mo recurring price
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. Local webhook testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

How it works:
- `/subscribe` — paywall; Checkout creates a subscription with `trial_period_days: 3` (card required upfront, auto-converts).
- Webhook (`/api/stripe/webhook`) mirrors Stripe subscription status onto the `User` row; access = `trialing | active | past_due`.
- `Settings → Membership` → **Manage billing** opens the Stripe Billing Portal (cancel/update card).

## Production checklist

1. Strong unique `AUTH_SECRET` (set on Vercel).
2. Postgres `DATABASE_URL` (Neon).
3. Run `prisma db push`, then `npm run admin:provision` with the intended `ADMIN_EMAIL` before deploying the lockdown.
4. OAuth keys for Google/Apple (optional until you add them).
5. **Stripe** `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` — billing is configured once these are set.
6. Uploads: chat/headshots use `public/uploads/` — on Vercel use object storage for persistence (S3/R2).
7. Chat moderation blocks secrets, SSNs, and inappropriate content server-side.

## Project layout

```
src/
  app/                 # Routes (landing, auth, dashboard, learn, social, …)
  auth.ts              # Auth.js config (email + Google + Apple)
  components/          # UI, widgets, social, landing interactions
  content/             # Seeded CRE / HF curriculum
  lib/                 # auth helpers, db, actions, moderation, stripe/billing/subscription
  app/api/stripe/      # Stripe webhook (subscription status sync)
prisma/
  schema.prisma
  seed.ts
public/uploads/        # Runtime user content (gitignored)
```

## License

Private — all rights reserved unless otherwise stated.
