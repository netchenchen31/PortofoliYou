import { connection } from "next/server";
import { supabase } from "./supabase";
import type { Category, Project } from "./types";

// Reading projects from the database. Every function first calls connection(),
// which tells Next.js to fetch fresh data on every visit — so an edit in the
// admin dashboard shows up right away, without redeploying.

// "*" = every column, so new columns added to the table show up automatically
const COLUMNS = "*";

// Newest first, then A–Z
function query() {
  return supabase()
    .from("projects")
    .select(COLUMNS)
    .order("year", { ascending: false })
    .order("title", { ascending: true });
}

// All projects (no categories given), or those tagged with ANY of `categories`
export async function getProjects(categories: Category[] = []): Promise<Project[]> {
  await connection();
  const { data, error } = categories.length
    ? await query().overlaps("category", categories)
    : await query();
  if (error) throw new Error(`Could not load projects: ${error.message}`);
  return data as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  await connection();
  const { data, error } = await query().eq("featured", true);
  if (error) throw new Error(`Could not load featured projects: ${error.message}`);
  return data as Project[];
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// One project by id, or null if it doesn't exist
export async function getProject(id: string): Promise<Project | null> {
  await connection();
  if (!UUID.test(id)) return null; // not even a valid id → not found
  const { data, error } = await supabase()
    .from("projects")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Could not load project: ${error.message}`);
  return data as Project | null;
}
