import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES, type Category } from "@/lib/types";
import { getProjects } from "@/lib/projects";

// Projects screen: /projects shows everything, /projects?category=Animation
// shows only projects whose category list includes "Animation".
export default async function ProjectsPage({ searchParams }: PageProps<"/projects">) {
  const { category: raw } = await searchParams;

  // Only accept one of the five known categories; anything else = show all.
  const selected = CATEGORIES.find((c) => c === raw) as Category | undefined;

  const projects = await getProjects(selected);

  const chip =
    "rounded-full border px-4 py-1.5 text-sm font-medium transition";
  const chipOn = "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900";
  const chipOff = "border-zinc-300 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-100";

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-sm text-zinc-500 hover:underline dark:text-zinc-400">
          ← Home
        </Link>
        <h1 className="text-3xl font-bold">{selected ? `${selected} projects` : "All projects"}</h1>
      </div>

      {/* Category filter — the selected one is highlighted */}
      <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
        <Link href="/projects" className={`${chip} ${selected ? chipOff : chipOn}`}>
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={{ pathname: "/projects", query: { category: c } }}
            aria-current={c === selected ? "page" : undefined}
            className={`${chip} ${c === selected ? chipOn : chipOff}`}
          >
            {c}
          </Link>
        ))}
      </nav>

      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        // Friendly empty state
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
          <p className="text-lg font-medium">
            {selected ? `No ${selected} projects yet.` : "No projects yet."}
          </p>
          {selected ? (
            <>
              <p className="text-zinc-500 dark:text-zinc-400">
                New work is on the way. In the meantime, take a look at everything else.
              </p>
              <Link href="/projects" className="mt-2 font-medium underline">
                See all projects
              </Link>
            </>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">New work is on the way — check back soon.</p>
          )}
        </div>
      )}
    </main>
  );
}
