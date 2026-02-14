"use client";

import { useEffect, useState } from "react";

const CHARSET = "!@#$%^&*+-=[]{}|;:<>?/~\\0123456789abcdef_";

interface BlockData {
  lines: string[];
  anims: { delay: number; duration: number }[][];
}

function generateBlock(
  rows: number,
  cols: number,
  density: number
): BlockData {
  const lines: string[] = [];
  const anims: { delay: number; duration: number }[][] = [];

  for (let r = 0; r < rows; r++) {
    let line = "";
    const rowAnims: { delay: number; duration: number }[] = [];

    for (let c = 0; c < cols; c++) {
      if (Math.random() < density) {
        line += CHARSET[Math.floor(Math.random() * CHARSET.length)];
        rowAnims.push({
          delay: Math.random() * 8,
          duration: 2 + Math.random() * 5,
        });
      } else {
        line += " ";
        rowAnims.push({ delay: 0, duration: 0 });
      }
    }

    lines.push(line);
    anims.push(rowAnims);
  }

  return { lines, anims };
}

function PatternBlock({
  rows,
  cols,
  density,
  className,
}: {
  rows: number;
  cols: number;
  density: number;
  className?: string;
}) {
  const [block, setBlock] = useState<BlockData | null>(null);

  useEffect(() => {
    setBlock(generateBlock(rows, cols, density));
  }, [rows, cols, density]);

  if (!block) return null;

  return (
    <pre className={className}>
      {block.lines.map((line, r) => (
        <div key={r}>
          {Array.from(line, (ch, c) => {
            if (ch === " ") {
              return (
                <span key={c} className="inline-block w-[1ch]">
                  {"\u00A0"}
                </span>
              );
            }

            const anim = block.anims[r][c];
            return (
              <span
                key={c}
                className="inline-block w-[1ch] text-center"
                style={{
                  animation: `ascii-pulse ${anim.duration}s ${anim.delay}s ease-in-out infinite`,
                  animationFillMode: "backwards",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </pre>
  );
}

export function AsciiField() {
  return (
    <>
      {/* Reverse vignette glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(120,120,120,0.04) 100%)",
        }}
      />

      {/* ASCII bottom-left cluster */}
      <div
        className="pointer-events-none absolute bottom-3 left-3 opacity-35"
        aria-hidden="true"
      >
        <PatternBlock
          rows={4}
          cols={28}
          density={0.2}
          className="font-mono text-[10px] leading-[1.8] text-neutral-500"
        />
      </div>

      {/* ASCII bottom-right cluster */}
      <div
        className="pointer-events-none absolute bottom-3 right-3 opacity-35"
        aria-hidden="true"
      >
        <PatternBlock
          rows={4}
          cols={28}
          density={0.2}
          className="font-mono text-[10px] leading-[1.8] text-neutral-500"
        />
      </div>
    </>
  );
}
