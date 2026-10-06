import Link from "next/link";

// Shown when someone opens /projects/<id> for a project that doesn't exist.
export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <p className="text-stone-600 dark:text-stone-400">
        This project may have been removed, or the link is incorrect.
      </p>
      <Link
        href="/projects"
        className="mt-2 rounded-full bg-stone-900 px-5 py-2 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
      >
        Back to Projects
      </Link>
    </main>
  );
}
