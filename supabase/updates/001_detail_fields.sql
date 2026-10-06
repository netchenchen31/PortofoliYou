-- =====================================================================
-- UPDATE 001 — extra project fields for the purpose-based detail pages
-- (For Recruiters / For Collaborators panels, tags, gallery, duration).
-- How to use: Supabase -> SQL Editor -> New query -> paste -> Run. Run ONCE.
-- Safe: only ADDS columns; existing projects and messages are kept.
-- (A brand-new project gets these columns from schema.sql already.)
-- =====================================================================
alter table public.projects
  add column if not exists tagline               text,                          -- one-line summary under the title
  add column if not exists tags                  text[] not null default '{}',  -- extra labels, e.g. {Short Film, Documentary}
  add column if not exists duration              text,                          -- e.g. 4:32 (shown on the thumbnail)
  add column if not exists gallery               text[] not null default '{}',  -- image links (stills under the video)
  add column if not exists key_skills            text,                          -- For Recruiters
  add column if not exists responsibilities      text,                          -- For Recruiters
  add column if not exists contribution          text,                          -- For Collaborators
  add column if not exists production_experience text,                          -- For Collaborators
  add column if not exists process_images        text[] not null default '{}';  -- For Collaborators (creative process)

-- ---------------------------------------------------------------------
-- OPTIONAL: fill the sample projects from seed.sql so you can see the new
-- panels straight away. Skip/delete this part if you removed the samples.
-- ---------------------------------------------------------------------
update public.projects set
  tagline = 'A short film about waking up with a city.',
  tags = array['Short Film', 'Documentary'],
  duration = '4:32',
  gallery = array['/dummy/film.svg', '/dummy/content.svg', '/dummy/research.svg', '/dummy/mixed.svg'],
  key_skills = 'Directing · Cinematography · Editing · Team Coordination',
  responsibilities = 'Pre-production · Shooting · Post-production · Project planning',
  contribution = 'Concept development, directing, production management, and final editing.',
  production_experience = 'Planning · Production · Post-production. Worked with a small team of 5.',
  process_images = array['/dummy/design.svg', '/dummy/animation.svg', '/dummy/film.svg']
where title = 'Quiet Streets';

update public.projects set
  tagline = 'Folded paper birds escape a notebook.',
  tags = array['2D Loop'],
  duration = '0:45',
  key_skills = 'Frame-by-frame animation · Illustration · Compositing',
  responsibilities = 'Storyboard · Animation · Texturing · Final render',
  contribution = 'Solo project — from sketches to final composite.',
  production_experience = 'Two weeks, hand-drawn at 12fps.'
where title = 'Paper Birds';
