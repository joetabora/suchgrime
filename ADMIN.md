# SuchGrime Admin & Shop Setup

## Local development

1. Link to Vercel and pull env (includes Prisma Postgres `DATABASE_URL`):

```bash
npx vercel link
npx vercel env pull .env
```

2. Also ensure these exist in `.env` (add in Vercel dashboard if missing):

```
ADMIN_PASSWORD=...
AUTH_SECRET=...
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

3. Create tables + seed:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

4. `npm run dev` → open http://localhost:3000/admin

## Prisma Postgres on Vercel

1. **Storage** → create / connect **Prisma Postgres** to this project  
2. Vercel sets `DATABASE_URL` automatically  
3. Also add manually:
   - `ADMIN_PASSWORD`
   - `AUTH_SECRET` (`openssl rand -base64 32`)
   - `NEXT_PUBLIC_SITE_URL`
4. Redeploy  
5. Run `db push` + `db:seed` once against that `DATABASE_URL` (from your machine after `vercel env pull`)

Admin: `https://your-site.vercel.app/admin`

## Stripe (optional)

```
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

Webhook endpoint: `https://your-domain.com/api/webhooks/stripe`  
Event: `checkout.session.completed`
