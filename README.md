# You need, I can — Starter

## 1) Create accounts
- Supabase (project URL + anon key)
- Vercel (hosting) connected to your GitHub

## 2) Copy files & install
- Copy this tree into a new folder
- `npm install`

## 3) Env vars
Create `.env.local` with:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## 4) Supabase: run SQL
Open Supabase → SQL → paste the SQL from this doc → Run
Auth → Providers → enable Email (OTP)

## 5) Run locally
`npm run dev` → http://localhost:3000

## 6) Deploy to Vercel
Import GitHub repo → add env vars → Deploy

### Notes
- Payments are off‑platform (price display only)
- Add moderation later (reports + blocklist)
- Add messaging later (threads + messages tables)