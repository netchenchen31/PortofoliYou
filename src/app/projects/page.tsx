import Link from "next/link";
import { ArrowLeft, SquarePen } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES, type Category, type Project } from "@/lib/types";
import { getProjects } from "@/lib/projects";
import { findPurpose, type PurposeId } from "@/lib/purposes";

// Projects ("Work") screen.
// /projects                                  → everything, with category chips
// /projects?category=Film&category=Design    → projects tagged Film OR Design
// /projects?purpose=hiring&category=Film      → "Hiring / Recruiting × Film" header
//                                              (category chosen on /interests)
// /projects?purpose=academic&category=Research, /projects?purpose=explore
export default async function ProjectsPage({ searchParams }: PageProps<"/projects">) {
  const { category, purpose: purposeId } = await searchParams;
  const purpose = findPurpose(purposeId);

  // Only keep the five known categories; none = show all
  const selected = [category ?? []]
    .flat()
    .filter((c): c is Category => (CATEGORIES as readonly string[]).includes(c));

  const projects = await getProjects(selected); // newest first
  const list = <ProjectGrid projects={projects} selected={selected} purpose={purpose?.id} />;

  // Visitor came through "What brings you here?"
  if (purpose) {
    const picksCategory = purpose.id === "hiring" || purpose.id === "collaborator";
    return (
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-stone-500 dark:text-stone-400">Showing projects for</p>
            <h1 className="text-3xl font-bold">
              {purpose.title}
              {picksCategory && (
                <>
                  <span className="font-normal text-stone-400"> × </span>
                  {selected.length ? selected.join(", ") : "All work"}
                </>
              )}
            </h1>
          </div>
          {/* back to the category cards (hiring/collab) or to Home (academic/explore) */}
          <Link
            href={picksCategory ? { pathname: "/interests", query: { purpose: purpose.id } } : "/"}
            className="flex items-center gap-1.5 text-sm font-medium underline"
          >
            <SquarePen aria-hidden className="h-4 w-4" /> Edit selection
          </Link>
        </div>
        {list}
      </Shell>
    );
  }

  // Plain "Work" page from the menu: category chips
  const chip = "rounded-full border px-4 py-1.5 text-sm font-medium transition";
  const chipOn = "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900";
  const chipOff = "border-stone-300 hover:border-stone-900 dark:border-stone-700 dark:hover:border-stone-100";
  const single = selected.length === 1 ? selected[0] : undefined;
  return (
    <Shell>
      <h1 className="text-3xl font-bold">{selected.length ? `${selected.join(", ")} projects` : "All work"}</h1>
      <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
        <Link href="/projects" className={`${chip} ${selected.length ? chipOff : chipOn}`}>All</Link>
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
      {list}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      <Link href="/" className="flex items-center gap-2 self-start text-sm text-stone-500 hover:underline dark:text-stone-400">
        <ArrowLeft aria-hidden className="h-4 w-4" /> Home
      </Link>
      {children}
    </main>
  );
}

function ProjectGrid({ projects, selected, purpose }: { projects: Project[]; selected: Category[]; purpose?: PurposeId }) {
  if (projects.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} purpose={purpose} />
          ))}
        </div>
      </div>
    );
  }
  // Friendly empty state
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-stone-300 px-6 py-16 text-center dark:border-stone-700">
      <p className="text-lg font-medium">
        {selected.length ? `No ${selected.join(" or ")} projects yet.` : "No projects yet."}
      </p>
      <p className="text-stone-500 dark:text-stone-400">
        {selected.length
          ? "New work is on the way. Try another category in the meantime."
          : "New work is on the way — check back soon."}
      </p>
    </div>
  );
}
