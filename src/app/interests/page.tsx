import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/icons";
import { CATEGORIES } from "@/lib/types";
import { findPurpose } from "@/lib/purposes";

export const metadata: Metadata = { title: "Choose a type of work · PortofoliYou" };

// Step 2 (hiring & collaborator): "What type of work are you interested in?"
// One tap on a card opens the matching projects — no extra "Show" button.
export default async function InterestsPage({ searchParams }: PageProps<"/interests">) {
  const { purpose: purposeId } = await searchParams;
  const purpose = findPurpose(purposeId);
  if (!purpose) redirect("/"); // no purpose chosen yet → back to Home

  const card =
    "flex flex-col items-center justify-center gap-3 rounded-xl bg-white px-4 py-7 font-medium ring-1 ring-stone-200 transition hover:bg-[#ece5d8] hover:ring-stone-400 dark:bg-stone-900 dark:ring-stone-800 dark:hover:bg-stone-700";
  const Other = CATEGORY_ICONS.Other;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      <Link href="/" className="flex items-center gap-2 self-start text-sm text-stone-500 hover:underline dark:text-stone-400">
        <ArrowLeft aria-hidden className="h-4 w-4" /> Back
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
          You&apos;re here: {purpose.title}
        </p>
        <h1 className="text-3xl font-bold">What type of work are you interested in?</h1>
        <p className="text-stone-600 dark:text-stone-400">Choose a category to see relevant projects.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c];
          return (
            <Link key={c} href={{ pathname: "/projects", query: { purpose: purpose.id, category: c } }} className={card}>
              <Icon aria-hidden className="h-6 w-6" />
              {c}
            </Link>
          );
        })}
        {/* "Other" = every category */}
        <Link href={{ pathname: "/projects", query: { purpose: purpose.id } }} className={card}>
          <Other aria-hidden className="h-6 w-6" />
          Other
        </Link>
      </div>
    </main>
  );
}
