// "What brings you here?" — the visitor's purpose. It only lives in the page
// address (e.g. ?purpose=hiring); nothing about visitors is stored or tracked.

import type { Category } from "./types";

export const PURPOSES = [
  { id: "hiring", label: "I'm hiring / recruiting", title: "Hiring / Recruiting" },
  { id: "collaborator", label: "I'm looking for a collaborator", title: "Collaboration" },
  { id: "academic", label: "I'm interested in academic / research work", title: "Academic / Research" },
  { id: "explore", label: "I just want to explore", title: "Exploring" },
] as const;

export type PurposeId = (typeof PURPOSES)[number]["id"];

export function findPurpose(id: unknown) {
  return PURPOSES.find((p) => p.id === id);
}

// Where each Home card leads.
// Hiring & collaborator → pick categories first. Academic → straight to
// Research projects. Explore → straight to everything.
export function purposeHref(id: PurposeId) {
  switch (id) {
    case "academic":
      return { pathname: "/projects", query: { purpose: id, category: "Research" satisfies Category } };
    case "explore":
      return { pathname: "/projects", query: { purpose: id } };
    default:
      return { pathname: "/interests", query: { purpose: id } };
  }
}
