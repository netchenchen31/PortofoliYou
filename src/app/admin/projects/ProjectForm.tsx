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

      <h2 className="text-lg font-semibold">Basics</h2>

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
        <legend className="mb-2 font-medium">Category * <span className="font-normal text-stone-500">(one or more)</span></legend>
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

      <Field label="Tagline" htmlFor="tagline" hint="One short sentence shown under the title and on the project card.">
        <input id="tagline" name="tagline" defaultValue={project?.tagline ?? ""} {...invalid("tagline")} />
      </Field>

      <Field label="Description *" htmlFor="description">
        <textarea id="description" name="description" rows={4} defaultValue={project?.description} {...invalid("description")} />
        {error("description")}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Extra tags" htmlFor="tags" hint="Separate with commas, e.g. Short Film, Documentary">
          <input id="tags" name="tags" defaultValue={(project?.tags ?? []).join(", ")} {...invalid("tags")} />
        </Field>
        <Field label="Duration" htmlFor="duration" hint="Shown on the thumbnail, e.g. 4:32">
          <input id="duration" name="duration" defaultValue={project?.duration ?? ""} {...invalid("duration")} />
        </Field>
      </div>

      <Section title="Media" />

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

      <Field label="Gallery images" htmlFor="gallery" hint="Stills shown under the video. One image link per line.">
        <textarea id="gallery" name="gallery" rows={3} placeholder={"https://…\nhttps://…"}
          defaultValue={(project?.gallery ?? []).join("\n")} {...invalid("gallery")} />
        {error("gallery")}
      </Field>

      <Section title="Shown to everyone" />

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

      <Field label="Creative process images" htmlFor="process_images" hint="Sketches, storyboards, behind the scenes. One image link per line.">
        <textarea id="process_images" name="process_images" rows={3} placeholder={"https://…\nhttps://…"}
          defaultValue={(project?.process_images ?? []).join("\n")} {...invalid("process_images")} />
        {error("process_images")}
      </Field>

      <Section title="For Recruiters" hint="Shown when the visitor chose “I'm hiring / recruiting”." />
      <Field label="Key skills" htmlFor="key_skills" hint="e.g. Directing · Cinematography · Editing">
        <input id="key_skills" name="key_skills" defaultValue={project?.key_skills ?? ""} {...invalid("key_skills")} />
      </Field>
      <Field label="Responsibilities" htmlFor="responsibilities" hint="e.g. Pre-production · Shooting · Post-production">
        <textarea id="responsibilities" name="responsibilities" rows={2}
          defaultValue={project?.responsibilities ?? ""} {...invalid("responsibilities")} />
      </Field>

      <Section title="For Collaborators" hint="Shown when the visitor chose “I'm looking for a collaborator” (with Role and Creative process above)." />
      <Field label="My contribution" htmlFor="contribution" hint="What you did on this project.">
        <textarea id="contribution" name="contribution" rows={2}
          defaultValue={project?.contribution ?? ""} {...invalid("contribution")} />
      </Field>
      <Field label="Production experience" htmlFor="production_experience" hint="e.g. Worked with a small team of 5.">
        <textarea id="production_experience" name="production_experience" rows={2}
          defaultValue={project?.production_experience ?? ""} {...invalid("production_experience")} />
      </Field>

      <Section title="Visibility" />

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

function Section({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mt-4 flex flex-col gap-1 border-t border-stone-200 pt-6 dark:border-stone-800">
      <h2 className="text-lg font-semibold">{title}</h2>
      {hint && <p className="text-sm text-stone-500 dark:text-stone-400">{hint}</p>}
    </div>
  );
}

function Field({ label, htmlFor, hint, children }: {
  label: string; htmlFor: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-medium">{label}</label>
      {hint && <p className="text-sm text-stone-500 dark:text-stone-400">{hint}</p>}
      {children}
    </div>
  );
}
