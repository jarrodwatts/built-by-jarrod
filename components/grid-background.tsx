"use client";

import { useEffect, useMemo, useState } from "react";

const COLS_PER_SIDE = 4;
const CENTER_COL = COLS_PER_SIDE + 1;
const TOTAL_COLS = COLS_PER_SIDE * 2 + 1;
const ROW_HEIGHTS = [80, 120, 80, 80, 160, 80, 120, 80, 80, 120, 80, 160, 80, 120];
const TOTAL_ROWS = ROW_HEIGHTS.length;
const LINE_COLOR = "rgb(255 255 255 / 0.07)";

const CELL_PAD = 8;
const DOT_COLS = 5;
const CHAR_LINE_HEIGHT = 14;

const TRAIL_LENGTH = 3;
const TRAIL_OPACITIES = [0.35, 0.2, 0.1];
const BASE_OPACITY = 0.04;

function dotMatrixRows(rowHeight: number): number {
  if (rowHeight >= 160) return 11;
  if (rowHeight >= 120) return 8;
  return 5;
}

function charColumnHeight(rowHeight: number): number {
  const available = rowHeight - CELL_PAD * 2;
  return Math.max(3, Math.floor(available / CHAR_LINE_HEIGHT));
}

function DotMatrix({ offset = 0, rows = 5 }: { offset?: number; rows?: number }) {
  const perimeter = useMemo(() => {
    const p: [number, number][] = [];
    for (let c = 0; c < DOT_COLS; c++) p.push([0, c]);
    for (let r = 1; r < rows; r++) p.push([r, DOT_COLS - 1]);
    for (let c = DOT_COLS - 2; c >= 0; c--) p.push([rows - 1, c]);
    for (let r = rows - 2; r >= 1; r--) p.push([r, 0]);
    return p;
  }, [rows]);

  const [tick, setTick] = useState(offset);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 250);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-[3px]">
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex gap-[3px]">
          {Array.from({ length: DOT_COLS }, (_, c) => {
            let opacity = BASE_OPACITY;
            for (let t = 0; t < TRAIL_LENGTH; t++) {
              const idx =
                ((tick - t) % perimeter.length + perimeter.length) %
                perimeter.length;
              if (perimeter[idx][0] === r && perimeter[idx][1] === c) {
                opacity = TRAIL_OPACITIES[t];
                break;
              }
            }
            return (
              <div
                key={c}
                className="size-[5px] rounded-[1px] bg-white transition-opacity duration-200"
                style={{ opacity }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

const CHAR_POOL = "01{}[]<>+-*/=_:|~&";

function CharColumn({ height = 8 }: { height?: number }) {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    setChars(
      Array.from(
        { length: height },
        () => CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)],
      ),
    );
    const id = setInterval(() => {
      setChars((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        next[i] = CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
        return next;
      });
    }, 250);
    return () => clearInterval(id);
  }, [height]);

  if (chars.length === 0) return null;

  return (
    <pre className="font-mono text-[10px] leading-[14px] text-white/15">
      {chars.join("\n")}
    </pre>
  );
}

function Label({ children }: { children: string }) {
  return (
    <span className="whitespace-pre font-mono text-[11px] tracking-wide text-white/[0.12]">
      {"[  "}
      {children}
      {"  ]"}
    </span>
  );
}

type CellContentType =
  | { type: "dot-matrix"; offset: number }
  | { type: "char-column" }
  | { type: "label"; text: string }
  | { type: "dot" }
  | { type: "square" };

const CELL_CONTENTS: { col: number; row: number; content: CellContentType }[] = [
  { col: 3, row: 2, content: { type: "dot-matrix", offset: 0 } },
  { col: 7, row: 5, content: { type: "dot-matrix", offset: 5 } },
  { col: 1, row: 12, content: { type: "dot-matrix", offset: 10 } },
  { col: 9, row: 7, content: { type: "char-column" } },
  { col: 2, row: 10, content: { type: "char-column" } },
  { col: 8, row: 1, content: { type: "label", text: "BUILD" } },
  { col: 1, row: 3, content: { type: "label", text: "200 OK" } },
  { col: 9, row: 6, content: { type: "label", text: "DEPLOY" } },
  { col: 2, row: 9, content: { type: "label", text: ".TSX" } },
  { col: 4, row: 4, content: { type: "dot" } },
  { col: 6, row: 2, content: { type: "square" } },
  { col: 4, row: 8, content: { type: "dot" } },
  { col: 6, row: 11, content: { type: "square" } },
  { col: 1, row: 13, content: { type: "dot" } },
  { col: 8, row: 4, content: { type: "dot" } },
];

const CONTENT_MAP = new Map<string, CellContentType>();
for (const { col, row, content } of CELL_CONTENTS) {
  CONTENT_MAP.set(`${col},${row}`, content);
}

function CellContent({ content, rowHeight }: { content: CellContentType; rowHeight: number }) {
  switch (content.type) {
    case "dot-matrix": {
      const rows = dotMatrixRows(rowHeight);
      return <DotMatrix offset={content.offset} rows={rows} />;
    }
    case "char-column": {
      const h = charColumnHeight(rowHeight);
      return <CharColumn height={h} />;
    }
    case "label":
      return <Label>{content.text}</Label>;
    case "dot":
      return <div className="size-[3px] rounded-full bg-white/10" />;
    case "square":
      return <div className="size-2 rounded-[1px] bg-white/[0.06]" />;
  }
}

export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden hidden xl:grid"
      style={{
        gridTemplateColumns: `repeat(${COLS_PER_SIDE}, 1fr) 56rem repeat(${COLS_PER_SIDE}, 1fr)`,
        gridTemplateRows: ROW_HEIGHTS.map((h) => `${h}px`).join(" ") + " 1fr",
        gap: "1px",
        backgroundColor: LINE_COLOR,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: (TOTAL_ROWS + 1) * TOTAL_COLS }, (_, i) => {
        const row = Math.floor(i / TOTAL_COLS) + 1;
        const col = (i % TOTAL_COLS) + 1;
        const rowHeight = row <= TOTAL_ROWS ? ROW_HEIGHTS[row - 1] : 0;
        const content =
          row <= TOTAL_ROWS && col !== CENTER_COL
            ? CONTENT_MAP.get(`${col},${row}`)
            : undefined;

        return (
          <div
            key={i}
            className="flex items-center justify-center overflow-hidden bg-black p-2"
          >
            {content && <CellContent content={content} rowHeight={rowHeight} />}
          </div>
        );
      })}
    </div>
  );
}
