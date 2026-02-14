import { cn } from "@/lib/utils";

interface CrossMarkProps {
  className?: string;
}

export function CrossMark({ className }: CrossMarkProps) {
  return (
    <div
      className={cn("pointer-events-none absolute z-10 h-8 w-8", className)}
    >
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-700" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-neutral-700" />
    </div>
  );
}

export function CrossPair({ position }: { position: "top" | "bottom" }) {
  const y =
    position === "top"
      ? "-top-[calc(1rem+0.5px)]"
      : "-bottom-[calc(1rem+0.5px)]";

  return (
    <>
      <CrossMark className={`-left-[calc(1rem+0.5px)] ${y}`} />
      <CrossMark className={`-right-[calc(1rem+0.5px)] ${y}`} />
    </>
  );
}
