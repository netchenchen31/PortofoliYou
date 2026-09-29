-- =====================================================================
-- PortofoliYou database schema
-- How to use: open your Supabase project -> SQL Editor -> New query,
-- paste this whole file, then click "Run". Safe to run once on a new project.
--
-- BEFORE RUNNING: replace  your-admin-email@example.com  (one place, in
-- is_admin() below) with the email you will use for the admin login.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. PROJECTS
-- ---------------------------------------------------------------------
create table public.projects (
  -- Unique ID for each project (used in the Project Detail page URL).
  id uuid primary key default gen_random_uuid(),

  title       text    not null check (length(trim(title)) > 0),
  year        integer not null check (year between 1900 and 2100),

  -- A list of categories, e.g. {Animation, Design}. No ordering/priority.
  -- Must have at least one, and only these five values are allowed.
  category    text[]  not null check (
    cardinality(category) > 0
    and category <@ array['Film', 'Animation', 'Design', 'Content Creation', 'Research']
  ),

  thumbnail   text    not null check (length(trim(thumbnail)) > 0),  -- image URL
  description text    not null check (length(trim(description)) > 0),

  role             text,
  tools            text,
  creative_process text,

  -- External link only (YouTube / Vimeo / Google Drive). No file uploads.
  final_result_media_url text,

  featured boolean not null default false
);

-- Speeds up "show projects in category X" once there are many projects.
create index projects_category_idx on public.projects using gin (category);


-- ---------------------------------------------------------------------
-- 2. CONTACT SUBMISSIONS
-- ---------------------------------------------------------------------
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),

  name         text not null check (length(trim(name)) > 0),
  email        text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  project_type text,
  message      text not null check (length(trim(message)) > 0),

  submitted_at timestamptz not null default now()  -- filled in automatically
);


-- ---------------------------------------------------------------------
-- 3. WHO IS THE ADMIN?
-- Returns true only when the logged-in user's email is the admin email.
-- ---------------------------------------------------------------------
create function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'your-admin-email@example.com';
$$;


-- ---------------------------------------------------------------------
-- 4. ACCESS RULES (Row Level Security)
-- With RLS on, nobody can read or change a table unless a policy allows it.
-- ---------------------------------------------------------------------
alter table public.projects            enable row level security;
alter table public.contact_submissions enable row level security;

-- Projects: everyone can view; only the admin can add, edit, or delete.
create policy "Anyone can view projects"
  on public.projects for select
  using (true);

create policy "Admin can add projects"
  on public.projects for insert
  to authenticated
  with check (public.is_admin());

create policy "Admin can edit projects"
  on public.projects for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin can delete projects"
  on public.projects for delete
  to authenticated
  using (public.is_admin());

-- Contact submissions: any visitor can send one; only the admin can read them.
-- No update/delete policies = submissions are read-only once sent.
create policy "Anyone can send a contact message"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Admin can read contact messages"
  on public.contact_submissions for select
  to authenticated
  using (public.is_admin());
