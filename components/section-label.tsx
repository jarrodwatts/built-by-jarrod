interface SectionLabelProps {
  children: string;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-10">
      {children}
    </h2>
  );
}
