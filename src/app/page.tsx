import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES } from "@/lib/types";
import Avatar from "@/components/Avatar";
import { DUMMY_PROJECTS } from "@/lib/dummy-data";
import { PROFILE } from "@/lib/profile";

// Home screen: intro + profile, category selector, featured projects.
export default function Home() {
  const featured = DUMMY_PROJECTS.filter((p) => p.featured);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-4 py-12 sm:px-8">
      {/* 1. Intro + profile */}
      <section className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Avatar />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{PROFILE.name}</h1>
          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
            {PROFILE.headline}
          </p>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">{PROFILE.intro}</p>
        </div>
      </section>

      {/* 2. Category selector — each button opens Projects filtered to that category */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">What are you looking for?</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={{ pathname: "/projects", query: { category } }}
              className="rounded-xl border border-zinc-300 px-4 py-5 text-center font-medium transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured projects (featured = true) */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Featured projects</h2>
        {featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-500">No featured projects yet.</p>
        )}
      </section>
    </main>
  );
}
