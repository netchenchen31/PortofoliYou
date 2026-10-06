import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase-server";
import type { ContactSubmission, Project } from "@/lib/types";
import { setFeatured, signOut } from "./actions";
import DeleteButton from "./DeleteButton";
import { primaryButton, secondaryButton } from "./ui";

export const metadata: Metadata = { title: "Admin · PortofoliYou" };

// Admin Dashboard: manage projects + read contact messages.
export default async function AdminDashboard({ searchParams }: PageProps<"/admin">) {
  const db = await requireAdmin();
  const { saved, deleted } = await searchParams;

  const [projectsResult, messagesResult] = await Promise.all([
    db.from("projects").select("*").order("year", { ascending: false }).order("title"),
    db.from("contact_submissions").select("*").order("submitted_at", { ascending: false }),
  ]);
  if (projectsResult.error) throw new Error(projectsResult.error.message);
  if (messagesResult.error) throw new Error(messagesResult.error.message);
  const projects = projectsResult.data as Project[];
  const messages = messagesResult.data as ContactSubmission[];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <form action={signOut}>
          <button type="submit" className={secondaryButton}>Log out</button>
        </form>
      </div>

      {(saved || deleted) && (
        <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-green-800 dark:bg-green-950 dark:text-green-200">
          {saved ? "Project saved." : "Project deleted."}
        </p>
      )}

      {/* ---------- Projects ---------- */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Projects ({projects.length})</h2>
          <Link href="/admin/projects/new" className={primaryButton}>+ Add project</Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-stone-500">No projects yet. Click “Add project” to create your first one.</p>
        ) : (
          <ul className="divide-y divide-stone-200 rounded-xl border border-stone-200 dark:divide-stone-800 dark:border-stone-800">
            {projects.map((p) => (
              <li key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <Link href={`/projects/${p.id}`} className="font-semibold hover:underline">
                    {p.title}
                  </Link>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {p.year} · {p.category.join(", ")}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <form action={setFeatured.bind(null, p.id, !p.featured)}>
                    <button
                      type="submit"
                      aria-pressed={p.featured}
                      title={p.featured ? "Shown on Home — click to remove" : "Click to show on Home"}
                      className={`${secondaryButton} ${p.featured ? "border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-100" : ""}`}
                    >
                      {p.featured ? "★ Featured" : "☆ Feature"}
                    </button>
                  </form>
                  <Link href={`/admin/projects/${p.id}/edit`} className={secondaryButton}>Edit</Link>
                  <DeleteButton id={p.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ---------- Contact messages (read-only) ---------- */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Messages ({messages.length})</h2>
        {messages.length === 0 ? (
          <p className="text-stone-500">No messages yet.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {messages.map((m) => (
              <li key={m.id} className="flex flex-col gap-2 rounded-xl border border-stone-200 p-4 dark:border-stone-800">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">
                    {m.name}{" "}
                    <a href={`mailto:${m.email}`} className="font-normal text-stone-500 underline dark:text-stone-400">
                      {m.email}
                    </a>
                  </p>
                  <time dateTime={m.submitted_at} className="text-sm text-stone-500 dark:text-stone-400">
                    {new Date(m.submitted_at).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Jakarta",
                    })}
                  </time>
                </div>
                {m.project_type && (
                  <p className="text-sm text-stone-500 dark:text-stone-400">Project type: {m.project_type}</p>
                )}
                <p className="whitespace-pre-wrap">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
