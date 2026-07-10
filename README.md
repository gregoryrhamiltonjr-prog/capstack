# CapStack

Climb the whole capital stack. Interactive learning for commercial real estate and high finance — institutional content, widgets, quizzes, gamified progression, and a social layer (groups, DMs, accountability partners).

## Live production

**https://capstack-sage.vercel.app**

- **Email signup / login** — live now  
- **Google & Apple** — wired in; enable by adding OAuth keys (see below)  
- **Postgres** — Neon  
- **Hosting** — Vercel  

Demo (seeded):

| Field    | Value               |
|----------|---------------------|
| Email    | `demo@capstack.app` |
| Password | `climbthestack`     |

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Prisma** + **Postgres** (Neon in production)
- **Auth.js** — email credentials + Google + Apple providers
- **Tailwind CSS**, **Framer Motion**, **GSAP**, **Recharts**

## Quick start (local)

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env
# Set AUTH_SECRET (openssl rand -base64 32)
# Set DATABASE_URL to Postgres (local Docker or Neon)

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
| `npm run db:seed` | Seed curriculum + demo cohort                    |
| `npm run db:reset`| Force-reset DB and re-seed                       |

## Auth: Google & Apple setup

Email works out of the box. To enable **Google** and **Apple** buttons in production:

### Google

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → create OAuth client (Web).
2. Authorized JavaScript origins: `https://capstack-sage.vercel.app`
3. Authorized redirect URI: `https://capstack-sage.vercel.app/api/auth/callback/google`
4. In Vercel project env (Production):

   ```
   AUTH_GOOGLE_ID=...
   AUTH_GOOGLE_SECRET=...
   ```

5. Redeploy.

### Apple

1. Apple Developer → Identifiers → Services ID with Sign in with Apple.
2. Return URL: `https://capstack-sage.vercel.app/api/auth/callback/apple`
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
AUTH_URL=https://capstack-sage.vercel.app
DATABASE_URL=postgresql://...   # Neon
```

## Production checklist

1. Strong unique `AUTH_SECRET` (set on Vercel).
2. Postgres `DATABASE_URL` (Neon).
3. OAuth keys for Google/Apple (optional until you add them).
4. Uploads: chat/headshots use `public/uploads/` — on Vercel use object storage for persistence (S3/R2).
5. Chat moderation blocks secrets, SSNs, and inappropriate content server-side.

## Project layout

```
src/
  app/                 # Routes (landing, auth, dashboard, learn, social, …)
  auth.ts              # Auth.js config (email + Google + Apple)
  components/          # UI, widgets, social, landing interactions
  content/             # Seeded CRE / HF curriculum
  lib/                 # auth helpers, db, actions, moderation
prisma/
  schema.prisma
  seed.ts
public/uploads/        # Runtime user content (gitignored)
```

## License

Private — all rights reserved unless otherwise stated.
