"use client";

// Shown instead of a page if something goes wrong while loading it
// (for example, the database can't be reached).
export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-stone-600 dark:text-stone-400">
        This page couldn&apos;t be loaded right now. Please try again in a moment.
      </p>
      <button
        onClick={() => retry()}
        className="mt-2 rounded-full bg-stone-900 px-5 py-2 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
      >
        Try again
      </button>
    </main>
  );
}
