"use client";

import { useActionState } from "react";
import { signIn } from "../actions";
import { emptyLoginState } from "../state";
import { inputClass, primaryButton } from "../ui";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, emptyLoginState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-medium">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" defaultValue={state.email} className={inputClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-medium">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" className={inputClass} />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}
