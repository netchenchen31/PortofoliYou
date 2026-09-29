# PortofoliYou

A multidisciplinary portfolio where visitors choose what they're interested in
(Film, Animation, Design, Content Creation, Research) and see only relevant projects.

Built with Next.js, Tailwind CSS, Supabase, and Vercel.

## Run it on your computer

You need [Node.js](https://nodejs.org) (the "LTS" version) installed once.

```bash
npm install      # download the libraries the project uses (first time only)
npm run dev      # start the site locally
```

Then open http://localhost:3000 in your browser. Press `Ctrl + C` in the terminal to stop.

## Folder guide

| Path | What it is |
| --- | --- |
| `src/app/` | The website's pages. Each folder becomes a URL (e.g. `src/app/about` → `/about`). |
| `src/app/page.tsx` | The Home page. |
| `src/app/layout.tsx` | The frame shared by every page (fonts, page title). |
| `src/app/globals.css` | Site-wide styles (loads Tailwind). |
| `src/lib/types.ts` | Describes the shape of a Project and a Contact submission. |
| `supabase/schema.sql` | Creates the database tables and access rules in Supabase. |
| `public/` | Static files served as-is (images, your CV PDF later). |
| `.env.example` | Template for the secret settings file `.env.local` (never committed). |

## Database setup (Supabase)

1. Create a free project at https://supabase.com.
2. Open `supabase/schema.sql` and replace `your-admin-email@example.com` with your admin email.
3. In Supabase, go to **SQL Editor → New query**, paste the whole file, and click **Run**.
4. Go to **Authentication → Users → Add user** and create your admin account using that same email.
5. Go to **Authentication → Sign In / Providers** and turn **off** "Allow new users to sign up",
   so nobody else can create an account.
6. Copy `.env.example` to `.env.local` and fill in the values from **Project Settings → API**.
