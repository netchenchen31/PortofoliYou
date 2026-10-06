import Link from "next/link";
import type { Project } from "@/lib/types";

// One project tile: thumbnail, title, year and category tags.
// Clicking it opens the Project Detail page (/projects/<id>).
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Plain <img> because thumbnails will be links to any website the admin
          chooses; next/image would need every website listed in next.config.ts. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.thumbnail}
        alt=""
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-semibold group-hover:underline">{project.title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.year}</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.category.map((c) => (
            <li
              key={c}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
