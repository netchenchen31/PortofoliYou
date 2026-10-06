import { PROFILE, initials } from "@/lib/profile";

// Profile photo, or your initials in a circle if there's no photo yet.
export default function Avatar() {
  return PROFILE.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PROFILE.photo}
      alt={PROFILE.name}
      className="h-28 w-28 shrink-0 rounded-full object-cover"
    />
  ) : (
    <div
      aria-hidden
      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-3xl font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
    >
      {initials(PROFILE.name)}
    </div>
  );
}
