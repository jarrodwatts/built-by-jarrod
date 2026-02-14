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

// --- Scaling functions ---

function dotMatrixRows(rowHeight: number): number {
  if (rowHeight >= 160) return 11;
  if (rowHeight >= 120) return 8;
  return 5;
}

function charColumnHeight(rowHeight: number): number {
  const available = rowHeight - CELL_PAD * 2;
  return Math.max(3, Math.floor(available / CHAR_LINE_HEIGHT));
}

function pulseGridRows(rowHeight: number): number {
  if (rowHeight >= 160) return 10;
  if (rowHeight >= 120) return 7;
  return 4;
}

function signalBarsHeight(rowHeight: number): number {
  if (rowHeight >= 160) return 80;
  if (rowHeight >= 120) return 56;
  return 36;
}

function lifeGridSize(rowHeight: number): { rows: number; cols: number } {
  if (rowHeight >= 160) return { rows: 14, cols: 5 };
  if (rowHeight >= 120) return { rows: 10, cols: 5 };
  return { rows: 6, cols: 5 };
}

function waveformHeight(rowHeight: number): number {
  if (rowHeight >= 160) return 80;
  if (rowHeight >= 120) return 56;
  return 36;
}

function barCodeHeight(rowHeight: number): number {
  if (rowHeight >= 160) return 80;
  if (rowHeight >= 120) return 56;
  return 32;
}

// --- Animated content components ---

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

function PulseGrid({ phase = 0, rows = 4 }: { phase?: number; rows?: number }) {
  const [tick, setTick] = useState(phase * 10);
  const cols = 4;
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-[5px]">
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex gap-[5px]">
          {Array.from({ length: cols }, (_, c) => {
            const dist = Math.sqrt((r - cy) ** 2 + (c - cx) ** 2);
            const wave = Math.sin(tick * 0.12 - dist * 1.2);
            const opacity = 0.03 + 0.22 * Math.max(0, wave);
            return (
              <div
                key={c}
                className="size-[4px] rounded-full bg-white transition-opacity duration-150"
                style={{ opacity }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function SignalBars({ maxHeight = 36 }: { maxHeight?: number }) {
  const [tick, setTick] = useState(0);
  const barCount = 5;

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-[3px]">
      {Array.from({ length: barCount }, (_, i) => {
        const phase = i * 1.3;
        const wave = Math.sin(tick * 0.1 - phase);
        const h = 3 + (maxHeight - 3) * (wave * 0.5 + 0.5);
        return (
          <div
            key={i}
            className="w-[3px] rounded-[1px] bg-white/15"
            style={{ height: h, transition: "height 150ms" }}
          />
        );
      })}
    </div>
  );
}

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function Spinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f + 1) % SPINNER_FRAMES.length),
      80,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-sm text-white/20">
      {SPINNER_FRAMES[frame]}
    </span>
  );
}

function Orbit() {
  return (
    <div className="relative size-4">
      <div className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: "4s" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[3px] rounded-full bg-white/25" />
      </div>
    </div>
  );
}

function LifeGrid({ rows = 8, cols = 5 }: { rows?: number; cols?: number }) {
  const [grid, setGrid] = useState<boolean[][] | null>(null);

  useEffect(() => {
    const seed = () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() < 0.4),
      );
    setGrid(seed());

    const id = setInterval(() => {
      setGrid((prev) => {
        if (!prev) return null;
        const next = prev.map((row, r) =>
          row.map((_, c) => {
            let n = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                if (prev[(r + dr + rows) % rows][(c + dc + cols) % cols]) n++;
              }
            }
            return n === 3 || (prev[r][c] && n === 2);
          }),
        );
        if (!next.flat().some(Boolean)) return seed();
        return next;
      });
    }, 400);
    return () => clearInterval(id);
  }, [rows, cols]);

  if (!grid) return null;

  return (
    <div className="flex flex-col gap-[2px]">
      {grid.map((row, r) => (
        <div key={r} className="flex gap-[2px]">
          {row.map((alive, c) => (
            <div
              key={c}
              className="size-[4px] rounded-[1px] bg-white transition-opacity duration-300"
              style={{ opacity: alive ? 0.3 : 0.03 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function WaveformLine({ height = 36 }: { height?: number }) {
  const [tick, setTick] = useState(0);
  const barCount = 12;

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-[2px]" style={{ height }}>
      {Array.from({ length: barCount }, (_, i) => {
        const wave = Math.sin(tick * 0.15 - i * 0.6);
        const h = 2 + height * 0.7 * (wave * 0.5 + 0.5);
        return (
          <div
            key={i}
            className="w-[2px] rounded-full bg-white/12"
            style={{ height: h, transition: "height 100ms" }}
          />
        );
      })}
    </div>
  );
}

function FadeChain({ count = 6, phase = 0 }: { count?: number; phase?: number }) {
  const [tick, setTick] = useState(phase);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 150);
    return () => clearInterval(id);
  }, []);

  const active = tick % count;

  return (
    <div className="flex gap-[4px]">
      {Array.from({ length: count }, (_, i) => {
        const dist = Math.abs(i - active);
        const opacity = dist === 0 ? 0.3 : dist === 1 ? 0.12 : 0.03;
        return (
          <div
            key={i}
            className="size-[4px] rounded-full bg-white transition-opacity duration-200"
            style={{ opacity }}
          />
        );
      })}
    </div>
  );
}

function Breathe() {
  return (
    <div className="relative size-4">
      <div
        className="absolute inset-0 rounded-full border border-white/15 animate-ping"
        style={{ animationDuration: "3s" }}
      />
      <div className="absolute left-1/2 top-1/2 size-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15" />
    </div>
  );
}

function BarCode({ height = 32 }: { height?: number }) {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    setBars(
      Array.from({ length: 8 }, () => (Math.random() < 0.5 ? 0.15 : 0.04)),
    );
    const id = setInterval(() => {
      setBars((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        next[i] = next[i] > 0.1 ? 0.04 : 0.15;
        return next;
      });
    }, 300);
    return () => clearInterval(id);
  }, []);

  if (bars.length === 0) return null;

  return (
    <div className="flex gap-[2px]">
      {bars.map((opacity, i) => (
        <div
          key={i}
          className="w-[2px] rounded-[1px] bg-white transition-opacity duration-200"
          style={{ opacity, height }}
        />
      ))}
    </div>
  );
}

// --- Cell content types and placement ---

type CellContentType =
  | { type: "dot-matrix"; offset: number }
  | { type: "char-column" }
  | { type: "pulse-grid"; phase: number }
  | { type: "signal-bars" }
  | { type: "spinner" }
  | { type: "orbit" }
  | { type: "life-grid" }
  | { type: "waveform" }
  | { type: "fade-chain"; phase: number }
  | { type: "breathe" }
  | { type: "bar-code" }
  | { type: "dot" }
  | { type: "square" };

const CELL_CONTENTS: { col: number; row: number; content: CellContentType }[] = [
  // DotMatrix (perimeter trace) — tall rows
  { col: 3, row: 2, content: { type: "dot-matrix", offset: 0 } },
  { col: 7, row: 5, content: { type: "dot-matrix", offset: 5 } },
  { col: 1, row: 12, content: { type: "dot-matrix", offset: 10 } },
  // CharColumn (cycling glyphs) — tall rows
  { col: 9, row: 7, content: { type: "char-column" } },
  { col: 2, row: 10, content: { type: "char-column" } },
  // PulseGrid (radial ripple)
  { col: 8, row: 1, content: { type: "pulse-grid", phase: 0 } },
  { col: 6, row: 14, content: { type: "pulse-grid", phase: 5 } },
  // SignalBars (equalizer)
  { col: 9, row: 6, content: { type: "signal-bars" } },
  { col: 4, row: 12, content: { type: "signal-bars" } },
  // Spinner (braille)
  { col: 1, row: 3, content: { type: "spinner" } },
  { col: 8, row: 11, content: { type: "spinner" } },
  // Orbit (CSS rotation)
  { col: 2, row: 9, content: { type: "orbit" } },
  // LifeGrid (Conway's Game of Life) — tall rows
  { col: 4, row: 5, content: { type: "life-grid" } },
  { col: 8, row: 10, content: { type: "life-grid" } },
  // WaveformLine (oscillating bars) — tall rows
  { col: 1, row: 7, content: { type: "waveform" } },
  { col: 9, row: 14, content: { type: "waveform" } },
  // FadeChain (sequential sweep)
  { col: 2, row: 1, content: { type: "fade-chain", phase: 0 } },
  { col: 7, row: 6, content: { type: "fade-chain", phase: 3 } },
  // Breathe (pulsing ring)
  { col: 7, row: 3, content: { type: "breathe" } },
  { col: 3, row: 8, content: { type: "breathe" } },
  // BarCode (shifting stripes)
  { col: 9, row: 3, content: { type: "bar-code" } },
  { col: 4, row: 9, content: { type: "bar-code" } },
  // Static decorative
  { col: 4, row: 4, content: { type: "dot" } },
  { col: 6, row: 2, content: { type: "square" } },
  { col: 6, row: 11, content: { type: "square" } },
  { col: 8, row: 4, content: { type: "dot" } },
  { col: 1, row: 13, content: { type: "dot" } },
  { col: 6, row: 8, content: { type: "dot" } },
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
    case "pulse-grid": {
      const rows = pulseGridRows(rowHeight);
      return <PulseGrid phase={content.phase} rows={rows} />;
    }
    case "signal-bars": {
      const h = signalBarsHeight(rowHeight);
      return <SignalBars maxHeight={h} />;
    }
    case "spinner":
      return <Spinner />;
    case "orbit":
      return <Orbit />;
    case "life-grid": {
      const size = lifeGridSize(rowHeight);
      return <LifeGrid rows={size.rows} cols={size.cols} />;
    }
    case "waveform": {
      const h = waveformHeight(rowHeight);
      return <WaveformLine height={h} />;
    }
    case "fade-chain":
      return <FadeChain phase={content.phase} />;
    case "breathe":
      return <Breathe />;
    case "bar-code": {
      const h = barCodeHeight(rowHeight);
      return <BarCode height={h} />;
    }
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
