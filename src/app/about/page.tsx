import type { Metadata } from "next";
import Avatar from "@/components/Avatar";
import { PROFILE } from "@/lib/profile";

export const metadata: Metadata = { title: "About · PortofoliYou" };

// About screen: profile, skills, experience, education, CV download link.
export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-4 py-12 sm:px-8">
      {/* Profile */}
      <section className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        <Avatar />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{PROFILE.name}</h1>
          <p className="text-lg font-medium text-stone-600 dark:text-stone-400">{PROFILE.headline}</p>
          <p className="leading-relaxed text-stone-700 dark:text-stone-300">{PROFILE.bio}</p>
          <div className="mt-2">
            {PROFILE.cvUrl ? (
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-stone-900 px-5 py-2 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
              >
                Download CV
              </a>
            ) : (
              <p className="text-sm text-stone-500 dark:text-stone-400">CV coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {PROFILE.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-stone-300 px-3 py-1 text-sm dark:border-stone-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <Timeline heading="Experience" items={PROFILE.experience} />
      <Timeline heading="Education" items={PROFILE.education} />
    </main>
  );
}

// A list of entries (job or school) with a title, place, period and optional detail.
function Timeline({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; place: string; period: string; detail?: string }[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{heading}</h2>
      <ol className="flex flex-col gap-6 border-l border-stone-200 pl-6 dark:border-stone-800">
        {items.map((item) => (
          <li key={item.title + item.period} className="flex flex-col gap-1">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="font-semibold">{item.title}</h3>
              <span className="text-sm text-stone-500 dark:text-stone-400">{item.period}</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400">{item.place}</p>
            {item.detail && <p className="text-stone-700 dark:text-stone-300">{item.detail}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
