import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Download, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";
import Avatar from "@/components/Avatar";
import { PROFILE } from "@/lib/profile";

export const metadata: Metadata = { title: "About · PortofoliYou" };

// About screen: profile, skills, experience, education, CV download link.
// All text comes from src/lib/profile.ts.
export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 sm:px-8">
      {/* ---------- Profile ---------- */}
      <section className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        <Avatar />
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-widest text-stone-500 uppercase dark:text-stone-400">About me</p>
          <h1 className="text-4xl font-bold tracking-tight">{PROFILE.name}</h1>
          <p className="text-lg text-stone-600 dark:text-stone-400">{PROFILE.headline}</p>
          <p className="max-w-2xl leading-relaxed text-stone-700 dark:text-stone-300">{PROFILE.bio}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            {PROFILE.cvUrl ? (
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
              >
                <Download aria-hidden className="h-4 w-4" /> Download CV
              </a>
            ) : (
              <span className="rounded-lg bg-stone-200/70 px-4 py-2.5 text-sm text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                CV coming soon
              </span>
            )}
            <Link href="/contact" className="flex items-center gap-1.5 font-medium hover:underline">
              Get in touch <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[2fr_3fr]">
        {/* ---------- Skills ---------- */}
        <Card icon={Sparkles} title="Skills">
          <ul className="flex flex-wrap gap-2">
            {PROFILE.skills.map((skill) => (
              <li key={skill} className="rounded-lg bg-[#efe8dc] px-3 py-1.5 text-sm dark:bg-stone-800">
                {skill}
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-6">
          <Card icon={BriefcaseBusiness} title="Experience">
            <Timeline items={PROFILE.experience} />
          </Card>
          <Card icon={GraduationCap} title="Education">
            <Timeline items={PROFILE.education} />
          </Card>
        </div>
      </div>
    </main>
  );
}

function Card({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-white p-5 ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Icon aria-hidden className="h-5 w-5" /> {title}
      </h2>
      {children}
    </section>
  );
}

// A list of entries (job or school) with a title, place, period and optional detail.
function Timeline({ items }: { items: { title: string; place: string; period: string; detail?: string }[] }) {
  return (
    <ol className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
      {items.map((item) => (
        <li key={item.title + item.period} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
            <h3 className="font-semibold">{item.title}</h3>
            <span className="shrink-0 text-sm text-stone-500 dark:text-stone-400">{item.period}</span>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">{item.place}</p>
          {item.detail && <p className="text-sm text-stone-700 dark:text-stone-300">{item.detail}</p>}
        </li>
      ))}
    </ol>
  );
}
