"use client";

import { deleteProject } from "./actions";
import { secondaryButton } from "./ui";

// Asks for confirmation in the browser before deleting.
export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProject.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this project? This can't be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className={`${secondaryButton} text-red-600 hover:border-red-600 dark:text-red-400 dark:hover:border-red-400`}
      >
        Delete
      </button>
    </form>
  );
}
