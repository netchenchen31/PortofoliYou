import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Connection to your Supabase database for the public pages.
// Uses the *publishable* key: it's safe to be public because the access rules
// in supabase/schema.sql decide what visitors may read or write.
let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      throw new Error(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
          "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (see .env.example).",
      );
    }
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}
