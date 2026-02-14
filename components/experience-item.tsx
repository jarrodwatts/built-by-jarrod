import Link from "next/link";
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
    <Link
      href={`/work/${experience.id}`}
      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-b border-neutral-800 py-5 transition-colors duration-300 hover:bg-white/[0.02]"
    >
      <span className="font-mono text-xs text-neutral-600 transition-colors duration-300 group-hover:text-neutral-500">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-semibold text-white">
            {experience.company}
          </span>
          <span className="text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
            {experience.role}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-0">
        <span className="font-mono text-sm text-neutral-500 whitespace-nowrap transition-colors duration-300 group-hover:text-neutral-400">
          {dateRange}
        </span>
        <span className="inline-flex w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-7 group-hover:opacity-100">
          <svg
            className="ml-3 h-3.5 w-3.5 shrink-0 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0-6-6m6 6-6 6"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
