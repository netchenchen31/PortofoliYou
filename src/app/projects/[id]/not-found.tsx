import Link from "next/link";

// Shown when someone opens /projects/<id> for a project that doesn't exist.
export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This project may have been removed, or the link is incorrect.
      </p>
      <Link
        href="/projects"
        className="mt-2 rounded-full bg-zinc-900 px-5 py-2 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Back to Projects
      </Link>
    </main>
  );
}
