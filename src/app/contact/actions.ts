"use server";

// Runs on the server when the Contact form is submitted.
// Checks the fields, then saves the message to the contact_submissions table.
// No email is sent; you read messages in the Admin Dashboard.

import { supabase } from "@/lib/supabase";
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

  // submitted_at is filled in by the database. No .select() afterwards:
  // visitors are allowed to add messages but not to read them back.
  const { error } = await supabase()
    .from("contact_submissions")
    .insert({ ...values, project_type: values.project_type || null });

  if (error) {
    console.error("Could not save contact message:", error.message);
    return {
      status: "error",
      errors: { form: "Sorry, your message couldn't be sent. Please try again in a moment." },
      values,
    };
  }

  return { ...emptyContactState, status: "success" };
}
