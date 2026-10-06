// Shapes shared by the Contact form (browser) and sendContact (server).
// Kept apart from actions.ts because a "use server" file may only export functions.

export type ContactField = "name" | "email" | "project_type" | "message";

export type ContactState = {
  status: "idle" | "error" | "success";
  errors: Partial<Record<ContactField | "form", string>>; // "form" = problem not tied to one field
  values: Record<ContactField, string>; // so the form keeps what was typed after an error
};

export const emptyContactState: ContactState = {
  status: "idle",
  errors: {},
  values: { name: "", email: "", project_type: "", message: "" },
};
