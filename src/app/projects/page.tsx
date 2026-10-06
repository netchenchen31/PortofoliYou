import Link from "next/link";
import { SquarePen } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES, type Category } from "@/lib/types";
import { getProjects } from "@/lib/projects";
import { findPurpose } from "@/lib/purposes";

// Projects ("Work") screen.
// /projects                                   → everything, with category chips
// /projects?category=Film&category=Design     → projects tagged Film OR Design
// /projects?purpose=hiring&category=Film      → same, with a "Hiring / Recruiting × Film" header
export default async function ProjectsPage({ searchParams }: PageProps<"/projects">) {
  const { category, purpose: purposeId } = await searchParams;
  const purpose = findPurpose(purposeId);

  // Only keep the five known categories; none = show all
  const selected = [category ?? []]
    .flat()
    .filter((c): c is Category => (CATEGORIES as readonly string[]).includes(c));

  const projects = await getProjects(selected); // newest first

  // "Edit selection": hiring & collaborator go back to the category picker
  // with their choices ticked; academic & explore go back to Home.
  const editHref =
    purpose && (purpose.id === "hiring" || purpose.id === "collaborator")
      ? { pathname: "/interests", query: { purpose: purpose.id, category: selected.length ? selected : ["Other"] } }
      : "/";

  const chip = "rounded-full border px-4 py-1.5 text-sm font-medium transition";
  const chipOn = "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900";
  const chipOff = "border-stone-300 hover:border-stone-900 dark:border-stone-700 dark:hover:border-stone-100";
  const single = selected.length === 1 ? selected[0] : undefined;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      {purpose ? (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-stone-500 dark:text-stone-400">Showing projects for</p>
            <h1 className="text-3xl font-bold">
              {purpose.title}
              {/* Academic already says "Research"; explore shows everything */}
              {purpose.id !== "academic" && purpose.id !== "explore" && (
                <>
                  <span className="font-normal text-stone-400"> × </span>
                  {selected.length ? selected.join(", ") : "All work"}
                </>
              )}
            </h1>
          </div>
          <Link href={editHref} className="flex items-center gap-1.5 text-sm font-medium underline">
            <SquarePen aria-hidden className="h-4 w-4" /> Edit selection
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{selected.length ? `${selected.join(", ")} projects` : "All work"}</h1>
          {/* Category filter — the selected one is highlighted */}
          <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
            <Link href="/projects" className={`${chip} ${selected.length ? chipOff : chipOn}`}>
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={{ pathname: "/projects", query: { category: c } }}
                aria-current={c === single ? "page" : undefined}
                className={`${chip} ${c === single ? chipOn : chipOff}`}
              >
                {c}
              </Link>
            ))}
          </nav>
        </>
      )}

      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} purpose={purpose?.id} />
          ))}
        </div>
      ) : (
        // Friendly empty state
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-stone-300 px-6 py-16 text-center dark:border-stone-700">
          <p className="text-lg font-medium">
            {selected.length ? `No ${selected.join(" or ")} projects yet.` : "No projects yet."}
          </p>
          {selected.length ? (
            <>
              <p className="text-stone-500 dark:text-stone-400">
                New work is on the way. In the meantime, take a look at everything else.
              </p>
              <Link
                href={purpose ? { pathname: "/projects", query: { purpose: purpose.id } } : "/projects"}
                className="mt-2 font-medium underline"
              >
                See all projects
              </Link>
            </>
          ) : (
            <p className="text-stone-500 dark:text-stone-400">New work is on the way — check back soon.</p>
          )}
        </div>
      )}
    </main>
  );
}
