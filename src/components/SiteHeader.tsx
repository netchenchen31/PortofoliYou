import Link from "next/link";

// Top bar shown on every page (added in src/app/layout.tsx).
const NAV = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-stone-200 dark:border-stone-800">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold">
          PortofoliYou
        </Link>
        <nav className="flex gap-5 text-sm font-medium">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
