"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import type { Stat } from "@/data/resume";

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="border-y border-neutral-800">
      <div className="mx-auto grid max-w-5xl grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 py-6 ${i < stats.length - 1 ? "border-r border-neutral-800" : ""}`}
          >
            <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500">
              {stat.label}
            </span>
            <span className="mt-1 block font-mono text-2xl font-bold text-white">
              <NumberTicker value={stat.value} className="text-white" />
              {stat.suffix && (
                <span className="text-neutral-500">{stat.suffix}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
