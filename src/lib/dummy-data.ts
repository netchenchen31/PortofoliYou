// TEMPORARY dummy data for Phase 2 (UI screens without a database).
// In Phase 3 the projects come from Supabase instead and this file is removed.
// The shapes match src/lib/types.ts, so the screens won't need to change much.

import type { Project } from "./types";

// Profile text shown on Home (and later About). Replace with your real details.
export const PROFILE = {
  name: "Your Name",
  headline: "Filmmaker · Animator · Designer · Researcher",
  intro:
    "I tell stories across film, animation, design, content creation and research. " +
    "Pick a category below to see only the work that's relevant to you.",
  photo: null as string | null, // image URL, or null to show initials
};

export const DUMMY_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Quiet Streets",
    year: 2025,
    category: ["Film"],
    thumbnail: "/dummy/film.svg",
    description: "A short documentary about a neighbourhood that wakes up before sunrise.",
    role: "Director, Editor",
    tools: "Sony FX3, DaVinci Resolve",
    creative_process: "Three weeks of early-morning shoots, edited around ambient sound.",
    final_result_media_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
  },
  {
    id: "2",
    title: "Paper Birds",
    year: 2024,
    category: ["Animation", "Design"],
    thumbnail: "/dummy/mixed.svg",
    description: "A 2D animated loop where folded paper birds escape a notebook.",
    role: "Animator, Illustrator",
    tools: "Procreate, After Effects",
    creative_process: "Hand-drawn frames on a 12fps grid, composited with paper textures.",
    final_result_media_url: "https://vimeo.com/76979871",
    featured: true,
  },
  {
    id: "3",
    title: "Campus Festival Identity",
    year: 2024,
    category: ["Design"],
    thumbnail: "/dummy/design.svg",
    description: "Logo, posters and social templates for a student arts festival.",
    role: "Graphic Designer",
    tools: "Figma, Illustrator",
    creative_process: null,
    final_result_media_url: null,
    featured: false,
  },
  {
    id: "4",
    title: "Behind the Lens Series",
    year: 2025,
    category: ["Content Creation", "Film"],
    thumbnail: "/dummy/content.svg",
    description: "Weekly short-form videos breaking down how scenes are shot.",
    role: "Creator, Host",
    tools: "iPhone, CapCut",
    creative_process: null,
    final_result_media_url: null,
    featured: true,
  },
  {
    id: "5",
    title: "Colour & Memory",
    year: 2023,
    category: ["Research"],
    thumbnail: "/dummy/research.svg",
    description: "A study of how colour grading affects what viewers remember from a scene.",
    role: "Researcher",
    tools: "Survey design, SPSS",
    creative_process: null,
    final_result_media_url: "https://drive.google.com/file/d/example/view",
    featured: false,
  },
  {
    id: "6",
    title: "Tiny Robot",
    year: 2023,
    category: ["Animation"],
    thumbnail: "/dummy/animation.svg",
    description: "A 30-second 3D character test about a robot learning to wave.",
    role: "3D Animator",
    tools: "Blender",
    creative_process: null,
    final_result_media_url: null,
    featured: false,
  },
];
