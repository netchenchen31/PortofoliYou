// Shapes shared by the admin forms (browser) and admin actions (server).
// Kept apart from actions.ts because a "use server" file may only export functions.

export type LoginState = { error: string | null; email: string };
export const emptyLoginState: LoginState = { error: null, email: "" };

export type ProjectField =
  | "title"
  | "year"
  | "category"
  | "thumbnail"
  | "description"
  | "role"
  | "tools"
  | "creative_process"
  | "final_result_media_url"
  | "tagline"
  | "tags"
  | "duration"
  | "gallery"
  | "key_skills"
  | "responsibilities"
  | "contribution"
  | "production_experience"
  | "process_images";

export type ProjectFormState = {
  errors: Partial<Record<ProjectField | "form", string>>;
};
export const emptyProjectFormState: ProjectFormState = { errors: {} };
