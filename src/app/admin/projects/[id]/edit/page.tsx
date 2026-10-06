import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase-server";
import type { Project } from "@/lib/types";
import ProjectForm from "../../ProjectForm";

export const metadata: Metadata = { title: "Edit project · Admin" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]/edit">) {
  const db = await requireAdmin();
  const { id } = await params;

  const { data, error } = UUID.test(id)
    ? await db.from("projects").select("*").eq("id", id).maybeSingle()
    : { data: null, error: null };
  if (error) throw new Error(error.message);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      {data ? (
        <>
          <h1 className="text-3xl font-bold">Edit project</h1>
          <ProjectForm project={data as Project} />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Project not found</h1>
          <Link href="/admin" className="underline">Back to dashboard</Link>
        </>
      )}
    </main>
  );
}
