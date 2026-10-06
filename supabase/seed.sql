-- =====================================================================
-- OPTIONAL: sample projects so the site isn't empty while you build the
-- Admin Dashboard. Run once in Supabase -> SQL Editor -> New query -> Run.
-- Delete them later from the Admin Dashboard (or Table Editor).
-- Thumbnails point to placeholder images in this repo's public/dummy folder.
-- =====================================================================
insert into public.projects
  (title, year, category, thumbnail, description, role, tools, creative_process, final_result_media_url, featured)
values
  ('Quiet Streets', 2025, array['Film'], '/dummy/film.svg',
   'A short documentary about a neighbourhood that wakes up before sunrise.',
   'Director, Editor', 'Sony FX3, DaVinci Resolve',
   'Three weeks of early-morning shoots, edited around ambient sound.',
   'https://www.youtube.com/watch?v=aqz-KE-bpKQ', true),

  ('Paper Birds', 2024, array['Animation', 'Design'], '/dummy/mixed.svg',
   'A 2D animated loop where folded paper birds escape a notebook.',
   'Animator, Illustrator', 'Procreate, After Effects',
   'Hand-drawn frames on a 12fps grid, composited with paper textures.',
   'https://vimeo.com/76979871', true),

  ('Campus Festival Identity', 2024, array['Design'], '/dummy/design.svg',
   'Logo, posters and social templates for a student arts festival.',
   'Graphic Designer', 'Figma, Illustrator', null, null, false),

  ('Behind the Lens Series', 2025, array['Content Creation', 'Film'], '/dummy/content.svg',
   'Weekly short-form videos breaking down how scenes are shot.',
   'Creator, Host', 'iPhone, CapCut', null, null, true),

  ('Colour & Memory', 2023, array['Research'], '/dummy/research.svg',
   'A study of how colour grading affects what viewers remember from a scene.',
   'Researcher', 'Survey design, SPSS', null,
   'https://example.com/not-a-video', false),  -- not a video link: page shows thumbnail only

  ('Tiny Robot', 2023, array['Animation'], '/dummy/animation.svg',
   'A 30-second 3D character test about a robot learning to wave.',
   '3D Animator', 'Blender', null, null, false);
