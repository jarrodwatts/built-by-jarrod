import Link from "next/link";
import { RESUME } from "@/data/resume";
import { SocialLinks } from "@/components/social-links";

export function Header() {
  return (
    <header className="border-b border-neutral-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm text-neutral-500 transition-colors hover:text-white"
        >
          {RESUME.name.toLowerCase().replace(" ", ".")}
        </Link>
        <SocialLinks links={RESUME.socials} size="sm" />
      </div>
    </header>
  );
}
