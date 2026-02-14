import { RESUME } from "@/data/resume";
import { SocialLinks } from "@/components/social-links";
import { BrandMark } from "@/components/brand-mark";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <BrandMark />
        <SocialLinks links={RESUME.socials} size="sm" />
      </div>
    </header>
  );
}
