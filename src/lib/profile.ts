// Your personal details, shown on Home and About.
// This is NOT in the database (the schema only stores projects and contact
// messages), so you change it by editing this file. Replace the sample text.

export const PROFILE = {
  name: "Your Name",
  headline: "Filmmaker · Animator · Designer · Researcher",
  intro:
    "I tell stories across film, animation, design, content creation and research. " +
    "Pick a category below to see only the work that's relevant to you.",
  photo: null as string | null, // image URL, or null to show initials

  // About page
  bio:
    "I'm a multidisciplinary creative studying [your programme] at [your university]. " +
    "I like projects where research and storytelling meet — from short documentaries " +
    "to animated loops and visual identities.",
  skills: [
    "Directing",
    "Video editing",
    "2D animation",
    "3D animation",
    "Graphic design",
    "Social media content",
    "User research",
  ],
  experience: [
    {
      title: "Video Editor (Freelance)",
      place: "Various clients",
      period: "2024 – now",
      detail: "Editing short-form and documentary videos.",
    },
    {
      title: "Design Intern",
      place: "Sample Studio",
      period: "Jun – Aug 2024",
      detail: "Created social media templates and event posters.",
    },
  ],
  education: [
    {
      title: "Bachelor of [Your Programme]",
      place: "[Your University]",
      period: "2022 – now",
    },
  ],
  // Link to your CV, e.g. a Google Drive "Anyone with the link" PDF.
  // Leave as null to show "CV coming soon" instead of the download button.
  cvUrl: null as string | null,
};

// "Your Name" → "YN" (used when there's no photo)
export function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
