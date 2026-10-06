// Shapes of the data, matching the tables in supabase/schema.sql.
// Keep these two files in sync if a field is ever added or changed.

export const CATEGORIES = [
  "Film",
  "Animation",
  "Design",
  "Content Creation",
  "Research",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Project = {
  id: string;
  title: string;
  year: number;
  category: Category[]; // one or more, no priority order
  thumbnail: string; // image URL
  description: string;
  role: string | null;
  tools: string | null;
  creative_process: string | null;
  final_result_media_url: string | null; // external link only (YouTube / Vimeo / Google Drive)
  featured: boolean;

  // Purpose-based detail pages (supabase/updates/001_detail_fields.sql).
  // Optional (?) so the site still works before that update is run.
  tagline?: string | null;
  tags?: string[];
  duration?: string | null;
  gallery?: string[]; // image links
  key_skills?: string | null; // For Recruiters
  responsibilities?: string | null; // For Recruiters
  contribution?: string | null; // For Collaborators
  production_experience?: string | null; // For Collaborators
  process_images?: string[]; // For Collaborators
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  project_type: string | null;
  message: string;
  submitted_at: string; // set automatically by the database
};
