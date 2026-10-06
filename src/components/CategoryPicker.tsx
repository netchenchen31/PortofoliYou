"use client";

// "What type of work are you interested in?" cards on the Projects page.
// Tapping a card updates the page address right away, so the project list
// underneath (passed in as `children`) refreshes without a "Show" button.

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_ICONS } from "@/components/icons";
import { CATEGORIES, type Category } from "@/lib/types";
import type { PurposeId } from "@/lib/purposes";

export default function CategoryPicker({
  purpose,
  initial,
  children,
}: {
  purpose: PurposeId;
  initial: Category[];
  children: ReactNode;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Category[]>(initial); // highlights instantly
  const [pending, startTransition] = useTransition();

  function update(next: Category[]) {
    setSelected(next);
    const query = new URLSearchParams({ purpose });
    next.forEach((c) => query.append("category", c));
    startTransition(() => router.replace(`/projects?${query}`, { scroll: false }));
  }

  const toggle = (c: Category) =>
    update(selected.includes(c) ? selected.filter((s) => s !== c) : [...selected, c]);

  const card = (on: boolean) =>
    `flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-5 text-sm font-medium ring-1 transition sm:text-base ${
      on
        ? "bg-[#ece5d8] ring-stone-400 dark:bg-stone-700 dark:ring-stone-500"
        : "bg-white ring-stone-200 hover:ring-stone-300 dark:bg-stone-900 dark:ring-stone-800"
    }`;

  const Other = CATEGORY_ICONS.Other;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c];
          return (
            <button key={c} type="button" aria-pressed={selected.includes(c)} onClick={() => toggle(c)} className={card(selected.includes(c))}>
              <Icon aria-hidden className="h-6 w-6" />
              {c}
            </button>
          );
        })}
        {/* "Other" = no filter, show every category */}
        <button type="button" aria-pressed={selected.length === 0} onClick={() => update([])} className={card(selected.length === 0)}>
          <Other aria-hidden className="h-6 w-6" />
          Other
        </button>
      </div>
      <div aria-busy={pending} className={`transition-opacity ${pending ? "opacity-50" : ""}`}>
        {children}
      </div>
    </>
  );
}
