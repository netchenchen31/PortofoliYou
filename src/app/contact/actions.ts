"use server";

// Runs on the server when the Contact form is submitted.
// Phase 2: checks the fields only — nothing is saved yet and no email is sent.
// Phase 3: after the checks pass, the message is saved to contact_submissions.

import { emptyContactState, type ContactField, type ContactState } from "./state";

// Same rule as the email check in supabase/schema.sql
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function sendContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const read = (key: ContactField) => String(formData.get(key) ?? "").trim();
  const values = {
    name: read("name"),
    email: read("email"),
    project_type: read("project_type"),
    message: read("message"),
  };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!values.email) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email, e.g. name@example.com.";
  if (!values.message) errors.message = "Please write a message.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // TODO (Phase 3): save `values` to the contact_submissions table here.

  return { ...emptyContactState, status: "success" };
}
