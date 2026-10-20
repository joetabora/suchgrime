# SuchGrime Admin & Shop Setup

## Local development

1. Copy env file and set secrets:

```bash
cp .env.example .env
```

2. Create the database and seed content:

```bash
npm run db:setup
```

3. Start the app:

```bash
npm run dev
```

4. Open admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Default local password is whatever you set in `ADMIN_PASSWORD` (example: `suchgrime-admin`).

## What admin can do

- Add / edit / delete **Features**
- Add / edit / delete **Builds**
- Add / edit / delete **Events**
- Add / edit / delete **Products** (price, inventory, status)
- View **Orders** after Stripe checkouts complete

## Stripe checkout

1. Create a [Stripe](https://stripe.com) account and get test keys.
2. Add to `.env`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Forward webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Put the webhook signing secret in `.env` as `STRIPE_WEBHOOK_SECRET`.

Shop features included:

- Product catalog from the database
- Cart (browser storage)
- Stripe Checkout (card + shipping address US/CA)
- Order records in admin
- Inventory decrement on successful payment

## Vercel / Neon Postgres

The app uses Postgres via Neon. Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Use |
|---|---|
| `DATABASE_URL` | Neon **pooled** connection string |
| `DATABASE_URL_UNPOOLED` | Neon **direct** (non-pooler) connection string |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `AUTH_SECRET` | Long random string (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |

Optional Stripe keys as listed above.

Create / reset tables and seed from your machine:

```bash
npx prisma db push
npm run db:seed
```

To wipe an old Neon database and start clean:

```bash
npx prisma db push --force-reset
npm run db:seed
```

Then redeploy on Vercel. Admin: `https://your-site.vercel.app/admin`

Point Stripe webhook to `https://your-domain.com/api/webhooks/stripe` for `checkout.session.completed`.
