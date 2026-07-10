# CapStack

Climb the whole capital stack. Interactive learning for commercial real estate and high finance — institutional content, widgets, quizzes, gamified progression, and a social layer (groups, DMs, accountability partners).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Prisma** + **SQLite** (swap to Postgres for multi-instance production)
- **Tailwind CSS**, **Framer Motion**, **GSAP**, **Recharts**
- Auth via signed HTTP-only cookies (`jose` + `bcryptjs`)

## Quick start (local)

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env
# Edit AUTH_SECRET — use a long random string in production:
# openssl rand -base64 32

# 3. Database + seed demo data
npm run setup

# 4. Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo account (after seed)

| Field    | Value              |
|----------|--------------------|
| Email    | `demo@capstack.app` |
| Password | `climbthestack`     |

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

## Production checklist

1. **Secrets**
   - Set a strong unique `AUTH_SECRET` (never use the example value).
   - Do not commit `.env`.

2. **Database**
   - SQLite is fine for a single-node demo / small VPS.
   - For Vercel, Railway, Render, Fly, etc. with multiple instances, use **Postgres** and set `DATABASE_URL` accordingly. Update `prisma/schema.prisma` `provider` to `postgresql` when you switch.

3. **Build & run**

   ```bash
   npm ci
   npx prisma generate
   npx prisma db push   # or migrate deploy once you add migrations
   npm run build
   npm run start
   ```

   Optional seed (demo content only):

   ```bash
   npm run db:seed
   ```

4. **Uploads**
   - Chat files and headshots land in `public/uploads/`.
   - On ephemeral hosts (e.g. Vercel), use object storage (S3, R2, Uploadthing) instead — this repo uses the local filesystem for simplicity.

5. **Chat safety**
   - Server-side moderation blocks sensitive work data (secrets, SSNs, account numbers) and inappropriate content in group/DM chats.

6. **Security headers / HTTPS**
   - Terminate TLS at your reverse proxy or platform.
   - Cookie `secure` flag is on when `NODE_ENV=production`.

## Project layout

```
src/
  app/                 # Routes (landing, auth, dashboard, learn, social, …)
  components/          # UI, widgets, social, landing interactions
  content/             # Seeded CRE / HF curriculum
  lib/                 # auth, db, actions, moderation, finance math
prisma/
  schema.prisma
  seed.ts
public/uploads/        # Runtime user content (gitignored)
```

## Deploy notes (common hosts)

### Vercel / similar

- Prefer **Postgres** (`DATABASE_URL`).
- Set `AUTH_SECRET` in project env.
- Build command: `prisma generate && next build`
- Post-deploy: run `prisma db push` or migrations against production DB.
- Local disk uploads will not persist — plan storage before shipping social files.

### Single VPS / Docker

- SQLite or Postgres both work if you pin one process (or use Postgres).
- Mount a volume for `public/uploads` and for the SQLite file if used.
- Process manager: `npm run start` behind nginx/Caddy.

## License

Private — all rights reserved unless otherwise stated.
