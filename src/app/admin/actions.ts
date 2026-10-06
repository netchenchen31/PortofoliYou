"use server";

// Everything the admin can DO (log in/out, add, edit, delete, feature).
// Each action runs on the server and checks you're the admin first; the
// database's own rules (schema.sql) also refuse anyone else.

import { redirect } from "next/navigation";
import { CATEGORIES, type Category } from "@/lib/types";
import { requireAdmin, supabaseAuth } from "@/lib/supabase-server";
import type { LoginState, ProjectFormState } from "./state";

// ---------- Login / logout ----------

export async function signIn(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Please enter your email and password.", email };

  const db = await supabaseAuth();
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) return { error: "Wrong email or password.", email };

  redirect("/admin");
}

export async function signOut() {
  const db = await supabaseAuth();
  await db.auth.signOut();
  redirect("/admin/login");
}

// ---------- Projects ----------

const URL_OR_PATH = /^(https?:\/\/\S+|\/\S*)$/; // a web link, or a file in /public like /dummy/film.svg

// Add (no id) or edit (with id) a project
export async function saveProject(
  _previous: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const db = await requireAdmin();

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const optional = (key: string) => text(key) || null; // empty box → stored as "nothing"
  const id = text("id");

  const project = {
    title: text("title"),
    year: Number(text("year")),
    category: formData
      .getAll("category")
      .map(String)
      .filter((c): c is Category => (CATEGORIES as readonly string[]).includes(c)),
    thumbnail: text("thumbnail"),
    description: text("description"),
    role: optional("role"),
    tools: optional("tools"),
    creative_process: optional("creative_process"),
    final_result_media_url: optional("final_result_media_url"),
    featured: formData.get("featured") === "on",
  };

  // Save is blocked until these are fixed
  const errors: ProjectFormState["errors"] = {};
  if (!project.title) errors.title = "Title is required.";
  if (project.category.length === 0) errors.category = "Pick at least one category.";
  if (!project.description) errors.description = "Description is required.";
  if (!Number.isInteger(project.year) || project.year < 1900 || project.year > 2100)
    errors.year = "Enter a year between 1900 and 2100.";
  if (!project.thumbnail) errors.thumbnail = "Thumbnail image link is required.";
  else if (!URL_OR_PATH.test(project.thumbnail))
    errors.thumbnail = "Must be a link starting with https://";
  if (project.final_result_media_url && !URL_OR_PATH.test(project.final_result_media_url))
    errors.final_result_media_url = "Must be a link starting with https://";
  if (Object.keys(errors).length > 0) return { errors };

  const { error } = id
    ? await db.from("projects").update(project).eq("id", id)
    : await db.from("projects").insert(project);
  if (error) {
    console.error("Could not save project:", error.message);
    return { errors: { form: "Couldn't save the project. Please try again." } };
  }

  redirect("/admin?saved=1");
}

export async function deleteProject(id: string) {
  const db = await requireAdmin();
  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) throw new Error(`Could not delete project: ${error.message}`);
  redirect("/admin?deleted=1");
}

export async function setFeatured(id: string, featured: boolean) {
  const db = await requireAdmin();
  const { error } = await db.from("projects").update({ featured }).eq("id", id);
  if (error) throw new Error(`Could not update project: ${error.message}`);
  redirect("/admin");
}
