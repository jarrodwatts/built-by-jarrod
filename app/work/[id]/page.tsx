import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RESUME } from "@/data/resume";
import { SectionLabel } from "@/components/section-label";
import { BlurFade } from "@/components/ui/blur-fade";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return RESUME.experience.map((exp) => ({ id: exp.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const experience = RESUME.experience.find((exp) => exp.id === id);
  if (!experience) return {};

  return {
    title: `${experience.company} — ${RESUME.name}`,
    description: experience.description,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { id } = await params;
  const experience = RESUME.experience.find((exp) => exp.id === id);

  if (!experience) notFound();

  const dateRange = experience.endDate
    ? `${experience.startDate} — ${experience.endDate}`
    : `${experience.startDate} — Present`;

  let delay = 0;
  const nextDelay = () => {
    delay += 0.05;
    return delay;
  };

  return (
    <div className="px-6 py-16">
      <BlurFade delay={nextDelay()}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-sm text-neutral-500 transition-colors hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>
      </BlurFade>

      <BlurFade delay={nextDelay()}>
        <h1 className="mt-16 text-4xl font-bold uppercase tracking-tighter text-white">
          {experience.company}
        </h1>
      </BlurFade>

      <BlurFade delay={nextDelay()}>
        <div className="mt-6 border-b border-neutral-800 pb-8">
          <p className="text-neutral-500">{experience.role}</p>
          <p className="mt-1 font-mono text-sm text-neutral-600">
            {dateRange}
          </p>
        </div>
      </BlurFade>

      <div className="mt-12 space-y-8">
        {experience.highlights.map((highlight, i) => (
          <BlurFade key={i} delay={nextDelay()}>
            <div>
              <p className="text-base leading-relaxed text-neutral-400">
                {highlight.text}
              </p>
              {highlight.tags && highlight.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {highlight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] tracking-wide text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </BlurFade>
        ))}
      </div>

      <BlurFade delay={nextDelay()}>
        <div className="mt-16 border-t border-neutral-800 pt-10">
          <SectionLabel>Technologies</SectionLabel>
          <p className="font-mono text-sm text-neutral-500">
            {experience.tags.join(" / ")}
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
