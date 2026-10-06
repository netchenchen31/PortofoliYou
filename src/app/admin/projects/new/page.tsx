import type { Metadata } from "next";
import { requireAdmin } from "@/lib/supabase-server";
import ProjectForm from "../ProjectForm";

export const metadata: Metadata = { title: "Add project · Admin" };

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      <h1 className="text-3xl font-bold">Add project</h1>
      <ProjectForm />
    </main>
  );
}
