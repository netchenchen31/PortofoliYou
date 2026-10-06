import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PURPOSE_ICONS } from "@/components/icons";
import { getFeaturedProjects } from "@/lib/projects";
import { PROFILE } from "@/lib/profile";
import { PURPOSES, purposeHref } from "@/lib/purposes";

// Home: big intro photo, "What brings you here?" purpose cards, featured work.
export default async function Home() {
  const featured = await getFeaturedProjects();

  return (
    <main className="flex w-full flex-1 flex-col">
      {/* 1. Intro over a big photo */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PROFILE.heroImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        {/* soft fade so the text stays readable on any photo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f7f4ef] via-[#f7f4ef]/80 to-transparent dark:from-[#141210] dark:via-[#141210]/80" />
        <div className="mx-auto flex min-h-[340px] w-full max-w-5xl flex-col justify-center gap-3 px-4 py-16 sm:min-h-[420px] sm:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Hi, I&apos;m {PROFILE.name}.</h1>
          <p className="max-w-md text-lg text-stone-600 dark:text-stone-300">{PROFILE.intro}</p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-12 sm:px-8">
        {/* 2. What brings you here? — each card goes straight to the next step */}
        <section className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">What brings you here?</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {PURPOSES.map((purpose) => {
              const Icon = PURPOSE_ICONS[purpose.id];
              return (
                <Link
                  key={purpose.id}
                  href={purposeHref(purpose.id)}
                  className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white px-4 py-7 text-center font-medium shadow-sm ring-1 ring-stone-200 transition hover:bg-[#ece5d8] hover:ring-stone-300 dark:bg-stone-900 dark:ring-stone-800 dark:hover:bg-stone-800"
                >
                  <Icon aria-hidden className="h-7 w-7" />
                  <span className="text-sm leading-snug sm:text-base">{purpose.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Same work.
              <br />
              Different perspectives.
            </p>
            <Link href={purposeHref("explore")} className="flex items-center gap-2 font-medium hover:underline">
              Let&apos;s begin <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 3. Featured projects (featured = true) */}
        {featured.length > 0 && (
          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Featured work</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
