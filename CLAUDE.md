@AGENTS.md

# PortofoliYou — project notes

Solo university project: a multidisciplinary portfolio (Film, Animation, Design,
Content Creation, Research) where visitors pick a category and see only relevant
work. Success = visitor reaches relevant work in under 3 clicks.

## Working rules
- Owner is new to web dev (old C++ background). Explain steps in plain language.
- Build one screen/feature at a time; after each, give exact steps to run and verify.
- Check in before big structural decisions.
- Do not build anything outside the scope below. If asked for something out of scope,
  flag it and ask for confirmation first.
- Explicitly excluded: AI recommendations, visitor accounts, payment, real-time chat,
  multi-admin, complex analytics, file-upload media storage, multi-language.
- Privacy: store only the fields in `supabase/schema.sql`; no visitor tracking.

## Stack
Next.js (App Router, TypeScript, `src/`) · Tailwind CSS · Supabase (Postgres + Auth) · Vercel.

## Where things live
- `supabase/schema.sql` — database tables + access rules (run in Supabase SQL Editor).
- `src/lib/types.ts` — TypeScript shapes matching the tables. Keep in sync with schema.
- `src/app/` — pages (one folder per route).
- `src/lib/profile.ts` — owner's name, bio, skills, experience, education, CV link (not in DB).
- `src/lib/projects.ts` — reads projects from Supabase (`src/lib/supabase.ts` = connection).
- `src/app/admin/` — login, dashboard, project form; `src/lib/supabase-server.ts` = logged-in connection + `requireAdmin()`; `src/proxy.ts` guards `/admin`.
- `supabase/seed.sql` — optional sample projects (thumbnails in `public/dummy/`).
- Env vars (see `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
  They are baked in at build time, so Vercel must redeploy after they change.

## Screens & logic (summary)
- Home: intro, profile, category selector → Projects filtered; featured projects (`featured = true`).
- Projects: show project if selected category ∈ project.category. Friendly empty state.
- Project Detail: all fields; media is an external link (YouTube/Vimeo/Drive); if invalid,
  show thumbnail only. Not-found state with link back to Projects.
- About: profile, skills, experience, education, CV download link.
- Contact: name/email/message required (inline errors); success confirmation; no email sent.
- Admin Login (Supabase Auth, single account) → Admin Dashboard: project add/edit/delete
  (confirm before delete: "Are you sure you want to delete this project? This can't be
  undone."), toggle featured, read-only contact submissions. Save blocked if title,
  category, or description empty. All admin routes require a session.

## Phases
1. Setup: project, schema ✅
2. UI screens with dummy data (no database yet) ✅
3+. Connect Supabase, admin, deploy checks

## Completion proof
1. Home → select "Animation" → Projects shows only Animation-tagged projects (incl. multi-tagged).
2. Submit Contact form → confirmation shown → entry visible in Admin Dashboard.
3. Admin edits a title → appears on public Projects + Project Detail without redeploy.
