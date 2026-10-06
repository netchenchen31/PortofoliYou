"use client";

// The tick-boxes for categories. Runs in the browser so tapping a card can
// highlight it instantly; "Show Projects" then opens the filtered list.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/icons";
import { CATEGORIES } from "@/lib/types";
import type { PurposeId } from "@/lib/purposes";

const OPTIONS = [...CATEGORIES, "Other"] as const; // "Other" = show every category

export default function InterestPicker({ purpose, initial }: { purpose: PurposeId; initial: string[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(initial);

  function toggle(option: string) {
    setSelected((now) => (now.includes(option) ? now.filter((o) => o !== option) : [...now, option]));
  }

  function showProjects() {
    const query = new URLSearchParams({ purpose });
    // With "Other" ticked every category is shown, so no filter is added
    if (!selected.includes("Other")) selected.forEach((c) => query.append("category", c));
    router.push(`/projects?${query}`);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {OPTIONS.map((option) => {
          const Icon = CATEGORY_ICONS[option];
          const on = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(option)}
              className={`flex flex-col items-center justify-center gap-3 rounded-xl px-4 py-7 font-medium ring-1 transition ${
                on
                  ? "bg-[#ece5d8] ring-stone-400 dark:bg-stone-700 dark:ring-stone-500"
                  : "bg-white ring-stone-200 hover:ring-stone-300 dark:bg-stone-900 dark:ring-stone-800"
              }`}
            >
              <Icon aria-hidden className="h-6 w-6" />
              {option}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={showProjects}
        disabled={selected.length === 0}
        className="flex items-center gap-2 rounded-lg bg-stone-900 px-8 py-3 font-medium text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
      >
        Show Projects <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}
