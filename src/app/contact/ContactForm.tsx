"use client";

// The form itself. It's a "client component" (runs in the visitor's browser)
// so it can show errors and the success message without reloading the page.

import { useActionState } from "react";
import { CATEGORIES } from "@/lib/types";
import { sendContact } from "./actions";
import { emptyContactState, type ContactField } from "./state";

const input =
  "w-full rounded-lg border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-stone-400";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, emptyContactState);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col gap-2 rounded-xl border border-green-300 bg-green-50 p-6 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100">
        <p className="text-lg font-semibold">Thank you! Your message has been sent.</p>
        <p>I&apos;ll get back to you by email as soon as I can.</p>
      </div>
    );
  }

  // Red border + message under a field that has an error
  const border = (field: ContactField) =>
    state.errors[field] ? "border-red-500" : "border-stone-300 dark:border-stone-700";
  const error = (field: ContactField) =>
    state.errors[field] && (
      <p id={`${field}-error`} className="text-sm text-red-600 dark:text-red-400">
        {state.errors[field]}
      </p>
    );
  const a11y = (field: ContactField) => ({
    "aria-invalid": !!state.errors[field],
    "aria-describedby": state.errors[field] ? `${field}-error` : undefined,
  });

  return (
    // noValidate: use our own friendly messages instead of the browser's pop-ups.
    // key: refills the fields with what was typed after an error.
    <form key={JSON.stringify(state.values)} action={formAction} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-medium">Name *</label>
        <input id="name" name="name" defaultValue={state.values.name} autoComplete="name" className={`${input} ${border("name")}`} {...a11y("name")} />
        {error("name")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-medium">Email *</label>
        <input id="email" name="email" type="email" defaultValue={state.values.email} autoComplete="email" className={`${input} ${border("email")}`} {...a11y("email")} />
        {error("email")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="project_type" className="font-medium">
          Project type <span className="font-normal text-stone-500">(optional)</span>
        </label>
        <select id="project_type" name="project_type" defaultValue={state.values.project_type} className={`${input} ${border("project_type")} dark:bg-stone-900`}>
          <option value="">Choose one…</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-medium">Message *</label>
        <textarea id="message" name="message" rows={6} defaultValue={state.values.message} className={`${input} ${border("message")}`} {...a11y("message")} />
        {error("message")}
      </div>

      {state.errors.form && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-stone-900 px-6 py-2.5 font-medium text-white hover:bg-stone-700 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
