import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  Clapperboard,
  FileText,
  ListChecks,
  Sparkles,
  User,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getProject } from "@/lib/projects";
import { toEmbedUrl } from "@/lib/media";
import { findPurpose, type PurposeId } from "@/lib/purposes";
import type { Project } from "@/lib/types";

// Project Detail screen: /projects/<id>?purpose=…
// The side panel changes with the visitor's purpose:
//   hiring       → "For Recruiters"   (role, key skills, responsibilities)
//   collaborator → "For Collaborators" (contribution, production experience, creative process)
//   otherwise    → "Project details"  (role, tools, creative process)
export default async function ProjectDetailPage({ params, searchParams }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const { purpose: purposeId, category } = await searchParams;
  const project = await getProject(id);

  // Unknown id → show the friendly not-found screen (not-found.tsx next to this file)
  if (!project) notFound();

  const purpose = findPurpose(purposeId);
  const embedUrl = toEmbedUrl(project.final_result_media_url);
  const gallery = project.gallery ?? [];
  const tags = [...project.category, ...(project.tags ?? []), String(project.year)];

  // "Back to Projects" returns to the same list the visitor came from
  const back = new URLSearchParams();
  if (purpose) back.set("purpose", purpose.id);
  [category ?? []].flat().forEach((c) => back.append("category", c));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-10 sm:px-8">
      <Link
        href={`/projects${back.size ? `?${back}` : ""}`}
        className="flex items-center gap-2 self-start text-sm text-stone-500 hover:underline dark:text-stone-400"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        {/* ---------- Left: video / thumbnail, stills, description ---------- */}
        <div className="flex flex-col gap-4">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`${project.title} — final result`}
              className="aspect-video w-full rounded-xl border-0 bg-black"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          ) : (
            // Not a YouTube / Vimeo / Drive link (or none) → thumbnail only
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.thumbnail} alt={project.title} className="aspect-video w-full rounded-xl object-cover" />
          )}

          {gallery.length > 0 && (
            <ul className="grid grid-cols-5 gap-2">
              {gallery.map((src, i) => (
                <li key={src + i}>
                  <a href={src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md hover:opacity-80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${project.title} — still ${i + 1}`} className="aspect-video w-full object-cover" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="leading-relaxed whitespace-pre-line text-stone-700 dark:text-stone-300">{project.description}</p>
        </div>

        {/* ---------- Right: title, tags, purpose panel, button ---------- */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
            {project.tagline && <p className="text-stone-600 dark:text-stone-400">{project.tagline}</p>}
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li key={t} className="rounded bg-stone-200/70 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                {t}
              </li>
            ))}
          </ul>

          <PurposePanel project={project} purpose={purpose?.id} />

          {project.final_result_media_url && (
            <a
              href={project.final_result_media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
            >
              {watchLabel(project)} <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

function watchLabel(project: Project) {
  if (project.category.includes("Film")) return "Watch Full Film";
  if (project.category.includes("Animation") || project.category.includes("Content Creation")) return "Watch Full Video";
  return "View Final Result";
}

type Item = { icon: LucideIcon; label: string; value?: string | null; strong?: string | null; images?: string[] };

function PurposePanel({ project, purpose }: { project: Project; purpose?: PurposeId }) {
  let heading: string;
  let HeadingIcon: LucideIcon;
  let tint: string;
  let items: Item[];

  if (purpose === "hiring") {
    heading = "For Recruiters";
    HeadingIcon = BriefcaseBusiness;
    tint = "bg-[#efe8dc] dark:bg-stone-800";
    items = [
      { icon: User, label: "My Role", strong: project.role },
      { icon: Camera, label: "Key Skills", value: project.key_skills },
      { icon: ListChecks, label: "Responsibilities", value: project.responsibilities },
    ];
  } else if (purpose === "collaborator") {
    heading = "For Collaborators";
    HeadingIcon = Users;
    tint = "bg-[#f3e4e1] dark:bg-stone-800";
    items = [
      { icon: Camera, label: "My Contribution", strong: project.role, value: project.contribution },
      { icon: Clapperboard, label: "Production Experience", value: project.production_experience },
      { icon: Sparkles, label: "Creative Process", value: project.creative_process, images: project.process_images },
    ];
  } else {
    heading = "Project details";
    HeadingIcon = FileText;
    tint = "bg-[#efe8dc] dark:bg-stone-800";
    items = [
      { icon: User, label: "Role", strong: project.role },
      { icon: Wrench, label: "Tools", value: project.tools },
      { icon: Sparkles, label: "Creative Process", value: project.creative_process, images: project.process_images },
    ];
  }

  // Only show what has been filled in
  const filled = items.filter((i) => i.strong || i.value || i.images?.length);
  if (filled.length === 0) return null;

  return (
    <section className={`flex flex-col gap-2 rounded-xl p-3 ${tint}`}>
      <h2 className="flex items-center gap-2 px-1 py-1 font-semibold">
        <HeadingIcon aria-hidden className="h-5 w-5" /> {heading}
      </h2>
      {filled.map(({ icon: Icon, label, strong, value, images }) => (
        <div key={label} className="flex gap-3 rounded-lg bg-white p-3 dark:bg-stone-900">
          <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400">{label}</h3>
            {strong && <p className="font-semibold">{strong}</p>}
            {value && <p className="text-sm whitespace-pre-line text-stone-700 dark:text-stone-300">{value}</p>}
            {images && images.length > 0 && (
              <ul className="mt-1 grid grid-cols-4 gap-1.5">
                {images.map((src, i) => (
                  <li key={src + i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${label} ${i + 1}`} className="aspect-square w-full rounded object-cover" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
