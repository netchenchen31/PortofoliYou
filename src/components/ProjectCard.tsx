import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category, Project } from "@/lib/types";
import type { PurposeId } from "@/lib/purposes";

// One project tile: thumbnail (+ duration), title, tags, short description.
// The visitor's purpose and chosen categories are passed on to the Project
// Detail page, so it can show the right panel and a working "Back" link.
export default function ProjectCard({
  project,
  purpose,
  categories = [],
}: {
  project: Project;
  purpose?: PurposeId;
  categories?: Category[];
}) {
  const query = new URLSearchParams();
  if (purpose) query.set("purpose", purpose);
  categories.forEach((c) => query.append("category", c));
  const href = `/projects/${project.id}${query.size ? `?${query}` : ""}`;

  const tags = [...project.category, ...(project.tags ?? [])];

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-stone-900 dark:ring-stone-800"
    >
      <div className="relative">
        {/* Plain <img> because thumbnails can be links to any website the admin
            chooses; next/image would need every website listed in next.config.ts. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.thumbnail} alt="" className="aspect-video w-full object-cover" />
        {project.duration && (
          <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
            {project.duration}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <ul className="flex flex-wrap gap-1.5">
          {[...tags, String(project.year)].map((t) => (
            <li key={t} className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              {t}
            </li>
          ))}
        </ul>
        <p className="line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{project.tagline || project.description}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-medium underline-offset-4 group-hover:underline">
          View Project <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
