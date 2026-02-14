import { Star } from "lucide-react";
import type { Project } from "@/data/resume";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border border-neutral-800 p-6 transition-colors hover:border-neutral-600"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-white group-hover:underline">
          {project.title}
        </h3>
        {project.stars !== undefined && (
          <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-neutral-500">
            <Star className="h-3 w-3" />
            {project.stars.toLocaleString()}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-neutral-500">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] uppercase tracking-wide text-neutral-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
