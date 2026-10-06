import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { toEmbedUrl } from "@/lib/media";

// Project Detail screen: /projects/<id>
export default async function ProjectDetailPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = await getProject(id);

  // Unknown id → show the friendly not-found screen (not-found.tsx next to this file)
  if (!project) notFound();

  const embedUrl = toEmbedUrl(project.final_result_media_url);

  // Optional fields: only shown when filled in
  const details = [
    { label: "Role", value: project.role },
    { label: "Tools", value: project.tools },
  ].filter((d) => d.value);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      <Link href="/projects" className="text-sm text-stone-500 hover:underline dark:text-stone-400">
        ← All projects
      </Link>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          <span>{project.year}</span>
          <span aria-hidden>·</span>
          {project.category.map((c) => (
            <Link
              key={c}
              href={{ pathname: "/projects", query: { category: c } }}
              className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-700 hover:underline dark:bg-stone-800 dark:text-stone-300"
            >
              {c}
            </Link>
          ))}
        </div>
      </header>

      {/* Final result: embedded video/file if the link is valid, otherwise the thumbnail only */}
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${project.title} — final result`}
          className="aspect-video w-full rounded-xl border-0 bg-black"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.thumbnail}
          alt={project.title}
          className="aspect-video w-full rounded-xl object-cover"
        />
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">About this project</h2>
        <p className="leading-relaxed text-stone-700 dark:text-stone-300">{project.description}</p>
      </section>

      {details.length > 0 && (
        <dl className="grid gap-4 rounded-xl border border-stone-200 p-5 sm:grid-cols-2 dark:border-stone-800">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="text-sm text-stone-500 dark:text-stone-400">{d.label}</dt>
              <dd className="font-medium">{d.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.creative_process && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Creative process</h2>
          <p className="leading-relaxed text-stone-700 dark:text-stone-300">
            {project.creative_process}
          </p>
        </section>
      )}
    </main>
  );
}
