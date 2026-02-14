import { RESUME } from "@/data/resume";
import { SectionLabel } from "@/components/section-label";
import { ExperienceItem } from "@/components/experience-item";
import { ProjectCard } from "@/components/project-card";
import { StatsBar } from "@/components/stats-bar";
import { CrossPair } from "@/components/cross-mark";
import { AsciiField } from "@/components/ascii-field";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-neutral-800 px-6 pt-24 pb-20 text-center">
        <AsciiField />
        <CrossPair position="bottom" />
        <h1 className="text-4xl font-bold uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
          {RESUME.name}
        </h1>
        <p className="mt-4 font-mono text-lg text-neutral-500">
          {RESUME.tagline}
        </p>
        <p className="mt-3 text-base text-neutral-600">{RESUME.bio}</p>
      </section>

      {/* Stats */}
      <StatsBar stats={RESUME.stats} />

      {/* Experience */}
      <section className="border-b border-neutral-800 px-6 py-20">
        <SectionLabel>Experience</SectionLabel>
        <div>
          {RESUME.experience.map((exp, i) => (
            <ExperienceItem key={exp.startDate} experience={exp} index={i} />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="relative border-b border-neutral-800 px-6 py-20">
        <CrossPair position="bottom" />
        <SectionLabel>Projects</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {RESUME.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="border-b border-neutral-800 px-6 py-20">
        <SectionLabel>Education</SectionLabel>
        {RESUME.education.map((edu) => (
          <div
            key={edu.institution}
            className="flex flex-wrap items-baseline justify-between gap-x-6"
          >
            <div>
              <a
                href={edu.honorsUrl ?? edu.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {edu.honors && (
                  <span className="font-semibold text-white">
                    {edu.honors}
                  </span>
                )}
                <span className="ml-3 text-neutral-500">{edu.degree}</span>
              </a>
            </div>
            <div className="flex items-baseline gap-3">
              <a
                href={edu.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white hover:underline"
              >
                {edu.institution}
              </a>
              <span className="font-mono text-sm text-neutral-600">
                {edu.startYear}–{edu.endYear}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">
          {RESUME.location}
        </p>
      </footer>
    </div>
  );
}
