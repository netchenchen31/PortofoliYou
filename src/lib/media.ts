// Turns a YouTube / Vimeo / Google Drive link into a URL that can be shown
// inside the page (an "embed" URL). Returns null for anything else, or for
// a broken link — the Project Detail page then shows the thumbnail only.
export function toEmbedUrl(link: string | null): string | null {
  if (!link) return null;

  let url: URL;
  try {
    url = new URL(link.trim());
  } catch {
    return null; // not a valid web address at all
  }

  const host = url.hostname.replace(/^www\.|^m\./, "");
  const parts = url.pathname.split("/").filter(Boolean);

  // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
  if (host === "youtube.com" || host === "youtu.be") {
    let id: string | null = null;
    if (host === "youtu.be") id = parts[0] ?? null;
    else if (parts[0] === "watch") id = url.searchParams.get("v");
    else if (parts[0] === "shorts" || parts[0] === "embed") id = parts[1] ?? null;
    // youtube-nocookie = YouTube's privacy-friendly player (no tracking cookies)
    return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }

  // Vimeo: vimeo.com/123456789
  if (host === "vimeo.com") {
    const id = parts.find((p) => /^\d+$/.test(p));
    return id ? `https://player.vimeo.com/video/${id}?dnt=1` : null;
  }

  // Google Drive: drive.google.com/file/d/ID/view
  if (host === "drive.google.com" && parts[0] === "file" && parts[1] === "d" && parts[2]) {
    return `https://drive.google.com/file/d/${parts[2]}/preview`;
  }

  return null;
}
