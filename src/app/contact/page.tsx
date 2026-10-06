import type { Metadata } from "next";
import { BriefcaseBusiness, GraduationCap, Users, type LucideIcon } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact · PortofoliYou" };

// Short hints so visitors know what to include (match the Home purposes)
const HINTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BriefcaseBusiness, title: "Hiring?", text: "Share the role, team and timeline." },
  { icon: Users, title: "Collaborating?", text: "Tell me about the idea and what you need." },
  { icon: GraduationCap, title: "Research?", text: "Mention the topic and how I can help." },
];

// Contact screen: name / email / message required, project type optional.
export default function ContactPage() {
  return (
    <main className="mx-auto grid w-full max-w-5xl flex-1 gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[2fr_3fr]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-widest text-stone-500 uppercase dark:text-stone-400">Contact</p>
          <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
          <p className="text-stone-600 dark:text-stone-400">
            Have a project in mind or a question about my work? Send me a message and I&apos;ll reply by email.
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {HINTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3 rounded-xl bg-[#efe8dc] p-4 dark:bg-stone-800">
              <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-stone-600 dark:text-stone-400">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="self-start rounded-xl bg-white p-5 ring-1 ring-stone-200 sm:p-7 dark:bg-stone-900 dark:ring-stone-800">
        <ContactForm />
      </div>
    </main>
  );
}
