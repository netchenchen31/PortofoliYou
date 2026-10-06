import { redirect } from "next/navigation";

// The category picker now lives on the Projects page itself.
// Old /interests links are sent there with the same choices.
export default async function InterestsPage({ searchParams }: PageProps<"/interests">) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    for (const v of [value ?? []].flat()) {
      if (!(key === "category" && v === "Other")) query.append(key, v);
    }
  }
  redirect(`/projects?${query}`);
}
