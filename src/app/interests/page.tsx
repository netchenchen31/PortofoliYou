import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import { findPurpose } from "@/lib/purposes";
import InterestPicker from "./InterestPicker";

export const metadata: Metadata = { title: "Choose your interests · PortofoliYou" };

// Step 2 (for hiring & collaborator): "What type of work are you interested in?"
// Also used by "Edit selection" on the Projects page, with the current choices ticked.
export default async function InterestsPage({ searchParams }: PageProps<"/interests">) {
  const { purpose: purposeId, category } = await searchParams;
  const purpose = findPurpose(purposeId);
  if (!purpose) redirect("/"); // no purpose chosen yet → back to Home

  // Choices to tick already (from "Edit selection"); "Other" means all categories
  const initial = [category ?? []]
    .flat()
    .filter((c) => c === "Other" || (CATEGORIES as readonly string[]).includes(c));

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      <Link href="/" className="flex items-center gap-2 text-sm text-stone-500 hover:underline dark:text-stone-400">
        <ArrowLeft aria-hidden className="h-4 w-4" /> Back
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
          You&apos;re here: {purpose.title}
        </p>
        <h1 className="text-3xl font-bold">What type of work are you interested in?</h1>
        <p className="text-stone-600 dark:text-stone-400">
          Select one or more categories to see relevant projects.
        </p>
      </div>
      <InterestPicker purpose={purpose.id} initial={initial} />
    </main>
  );
}
