import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Supabase connection for the ADMIN pages. Unlike src/lib/supabase.ts it
// remembers who is logged in (the login is stored in a browser cookie), so
// the database knows the request comes from you and the admin rules apply.
// A new one is made for every request, as Supabase requires.
export async function supabaseAuth() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Pages can't change cookies, only actions can. That's fine:
            // src/proxy.ts keeps the login fresh on every admin request.
          }
        },
      },
    },
  );
}

// Use at the top of every admin page and admin action.
// Not logged in → login page. Logged in with an account that isn't the admin
// email from schema.sql → logged out and sent back to the login page.
export async function requireAdmin() {
  const db = await supabaseAuth();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await db.rpc("is_admin"); // the function in schema.sql
  if (!isAdmin) {
    await db.auth.signOut();
    redirect("/admin/login?error=not-admin");
  }
  return db;
}
