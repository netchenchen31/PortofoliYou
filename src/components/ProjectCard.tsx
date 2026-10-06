import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";
import type { PurposeId } from "@/lib/purposes";

// One project tile: thumbnail, title, tags, short description, "View Project".
// The visitor's purpose (if any) is passed on to the Project Detail page.
export default function ProjectCard({ project, purpose }: { project: Project; purpose?: PurposeId }) {
  const href = purpose ? `/projects/${project.id}?purpose=${purpose}` : `/projects/${project.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-stone-900 dark:ring-stone-800"
    >
      {/* Plain <img> because thumbnails can be links to any website the admin
          chooses; next/image would need every website listed in next.config.ts. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.thumbnail} alt="" className="aspect-video w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <ul className="flex flex-wrap gap-1.5">
          {project.category.map((c) => (
            <li key={c} className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              {c}
            </li>
          ))}
          <li className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300">
            {project.year}
          </li>
        </ul>
        <p className="line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{project.description}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-medium underline-offset-4 group-hover:underline">
          View Project <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
