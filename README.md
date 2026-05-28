# Better SaaS

A production-ready SaaS boilerplate built with:

- **Next.js 16** — App Router, Server Components, Server Actions, Proxy API
- **Better Auth** — Email/password + OAuth (Google, GitHub)
- **Self-hosted Convex** — Real-time database with serverless functions
- **Polar.sh** — Subscriptions, checkout, webhooks
- **Shadcn UI** + **Lucide Icons** — Beautiful, accessible components
- **Tailwind CSS v4** — Utility-first styling

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/PunchyRock/better-saas.git
cd better-saas
pnpm install
```

### 2. Set Up Convex (Self-Hosted)

Start the self-hosted Convex backend:

```bash
# Clone and start Convex
git clone https://github.com/get-convex/convex-backend.git
cd convex-backend/self-hosted/docker
docker compose up -d

# Generate admin key
docker compose exec backend ./generate_admin_key.sh
```

Note the admin key and backend URL (default: `http://127.0.0.1:3210`).

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Fill in your values:
- `BETTER_AUTH_SECRET` — Generate with `openssl rand -base64 32`
- `CONVEX_SELF_HOSTED_URL` — Your Convex backend URL
- `CONVEX_SELF_HOSTED_ADMIN_KEY` — From step 2
- OAuth credentials (optional)
- Polar.sh credentials

### 4. Push Convex Schema

```bash
npx convex dev --once
```

### 5. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/      # Dashboard pages (protected)
│   │   ├── dashboard/
│   │   │   ├── billing/  # Subscription management
│   │   │   └── settings/ # User profile settings
│   │   └── layout.tsx    # Dashboard layout with sidebar
│   ├── api/
│   │   ├── auth/         # Better Auth API routes
│   │   ├── checkout/     # Polar.sh checkout
│   │   └── webhook/      # Polar.sh webhooks
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── features/         # Feature components (notifications, etc.)
│   ├── layout/           # Layout components (sidebar, header)
│   └── ui/               # Shadcn UI components
├── lib/
│   ├── auth.ts           # Better Auth server config
│   ├── auth-client.ts    # Better Auth client
│   ├── convex.ts         # Convex client
│   ├── polar.ts          # Polar.sh client
│   └── utils.ts          # Utility functions
├── providers/
│   └── convex-provider.tsx
└── proxy.ts              # Next.js 16 proxy (auth protection)
convex/
├── schema.ts             # Database schema
├── users.ts              # User queries & mutations
├── subscriptions.ts      # Subscription queries & mutations
└── notifications.ts      # Notification queries & mutations
```

## Features

### Authentication
- Email/password sign up and sign in
- OAuth providers (GitHub, Google)
- Session-based auth with Better Auth
- Protected routes via Next.js 16 Proxy

### Payments (Polar.sh)
- Checkout integration for Pro plan
- Webhook handler for subscription sync
- Subscription management (upgrade, cancel)
- Billing portal for customers

### Real-Time (Convex)
- Live notification panel
- Real-time data sync
- Serverless functions for business logic
- Self-hosted for full data control

### UI
- Responsive, mobile-first design
- Dark mode ready (via CSS variables)
- Accessible components (Shadcn UI)
- Beautiful icons (Lucide)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Auth | Better Auth |
| Database | Convex (self-hosted) |
| Payments | Polar.sh |
| UI | Shadcn UI + Lucide |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict) |

## Environment Variables

See `.env.example` for all required variables.

## Deployment

### Convex Backend
Deploy your self-hosted Convex to:
- Docker (local or VPS)
- fly.io
- Railway
- Any Docker-compatible host

### Next.js Frontend
Deploy to Vercel, Netlify, or any Node.js host:

```bash
pnpm build
pnpm start
```

## License

MIT
