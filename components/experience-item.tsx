import type { Experience } from "@/data/resume";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const dateRange = experience.endDate
    ? `${experience.startDate} — ${experience.endDate}`
    : `${experience.startDate} — Present`;

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-b border-neutral-800 py-5">
      <span className="font-mono text-xs text-neutral-600">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:underline"
          >
            {experience.company}
          </a>
          <span className="text-neutral-500">{experience.role}</span>
        </div>
      </div>
      <span className="font-mono text-sm text-neutral-500 whitespace-nowrap">
        {dateRange}
      </span>
    </div>
  );
}
