"use client";

// Add / edit project form. Used by /admin/projects/new and /admin/projects/<id>/edit.

import Link from "next/link";
import { startTransition, useActionState } from "react";
import { CATEGORIES, type Project } from "@/lib/types";
import { saveProject } from "../actions";
import { emptyProjectFormState, type ProjectField } from "../state";
import { inputClass, primaryButton, secondaryButton } from "../ui";

export default function ProjectForm({ project }: { project?: Project }) {
  const [state, formAction, pending] = useActionState(saveProject, emptyProjectFormState);
  const errors = state.errors;

  const error = (field: ProjectField) =>
    errors[field] && (
      <p id={`${field}-error`} className="text-sm text-red-600 dark:text-red-400">{errors[field]}</p>
    );
  const invalid = (field: ProjectField) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    className: `${inputClass} ${errors[field] ? "!border-red-500" : ""}`,
  });

  return (
    <form
      noValidate
      // Submitting this way keeps what you typed in the boxes if there's an error
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="flex flex-col gap-6"
    >
      {project && <input type="hidden" name="id" value={project.id} />}

      <Field label="Title *" htmlFor="title">
        <input id="title" name="title" defaultValue={project?.title} {...invalid("title")} />
        {error("title")}
      </Field>

      <Field label="Year *" htmlFor="year">
        <input id="year" name="year" type="number" min={1900} max={2100}
          defaultValue={project?.year ?? new Date().getFullYear()} {...invalid("year")} />
        {error("year")}
      </Field>

      <fieldset className="flex flex-col gap-2" aria-describedby={errors.category ? "category-error" : undefined}>
        <legend className="mb-2 font-medium">Category * <span className="font-normal text-zinc-500">(one or more)</span></legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex items-center gap-2">
              <input type="checkbox" name="category" value={c} defaultChecked={project?.category.includes(c)} className="h-4 w-4" />
              {c}
            </label>
          ))}
        </div>
        {error("category")}
      </fieldset>

      <Field label="Description *" htmlFor="description">
        <textarea id="description" name="description" rows={4} defaultValue={project?.description} {...invalid("description")} />
        {error("description")}
      </Field>

      <Field label="Thumbnail image link *" htmlFor="thumbnail"
        hint="A direct link to an image (ends in .jpg / .png / .webp), e.g. from your website or an image host.">
        <input id="thumbnail" name="thumbnail" type="url" placeholder="https://…" defaultValue={project?.thumbnail} {...invalid("thumbnail")} />
        {error("thumbnail")}
      </Field>

      <Field label="Final result link" htmlFor="final_result_media_url"
        hint="YouTube, Vimeo or Google Drive link. Any other link shows the thumbnail only.">
        <input id="final_result_media_url" name="final_result_media_url" type="url" placeholder="https://…"
          defaultValue={project?.final_result_media_url ?? ""} {...invalid("final_result_media_url")} />
        {error("final_result_media_url")}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Role" htmlFor="role">
          <input id="role" name="role" defaultValue={project?.role ?? ""} {...invalid("role")} />
        </Field>
        <Field label="Tools" htmlFor="tools">
          <input id="tools" name="tools" defaultValue={project?.tools ?? ""} {...invalid("tools")} />
        </Field>
      </div>

      <Field label="Creative process" htmlFor="creative_process">
        <textarea id="creative_process" name="creative_process" rows={4}
          defaultValue={project?.creative_process ?? ""} {...invalid("creative_process")} />
      </Field>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4" />
        Featured (show on Home)
      </label>

      {(errors.form || Object.keys(errors).length > 0) && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {errors.form ?? "Please fix the highlighted fields before saving."}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? "Saving…" : project ? "Save changes" : "Add project"}
        </button>
        <Link href="/admin" className={secondaryButton}>Cancel</Link>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, hint, children }: {
  label: string; htmlFor: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-medium">{label}</label>
      {hint && <p className="text-sm text-zinc-500 dark:text-zinc-400">{hint}</p>}
      {children}
    </div>
  );
}
