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

function matrixRainRows(rowHeight: number): number {
  if (rowHeight >= 160) return 10;
  if (rowHeight >= 120) return 7;
  return 4;
}

function tetrisBoardSize(rowHeight: number): { rows: number; cols: number } {
  if (rowHeight >= 160) return { rows: 12, cols: 6 };
  if (rowHeight >= 120) return { rows: 9, cols: 6 };
  return { rows: 6, cols: 5 };
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

const TYPING_WORDS = ["claude", "codex", "gemini", "droid", "opencode", "cursor"];

function MatrixRain({ rows = 5 }: { rows?: number }) {
  const cols = 3;
  const [tick, setTick] = useState(-1);

  useEffect(() => {
    setTick(0);
    const id = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(id);
  }, []);

  if (tick < 0) return null;

  return (
    <div className="flex gap-[6px]">
      {Array.from({ length: cols }, (_, c) => {
        const head = (tick + c * 3) % rows;
        return (
          <div key={c} className="flex flex-col gap-[2px]">
            {Array.from({ length: rows }, (_, r) => {
              const dist = (head - r + rows) % rows;
              const opacity =
                dist === 0
                  ? 0.4
                  : dist === 1
                    ? 0.2
                    : dist === 2
                      ? 0.08
                      : 0.03;
              const charIdx = (tick + c * 7 + r * 3) % CHAR_POOL.length;
              return (
                <span
                  key={r}
                  className="block font-mono text-[10px] leading-[14px] text-white transition-opacity duration-150"
                  style={{ opacity }}
                >
                  {CHAR_POOL[charIdx]}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function CursorBlink() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="font-mono text-xs text-white/25 transition-opacity duration-100"
      style={{ opacity: on ? 1 : 0 }}
    >
      █
    </span>
  );
}

function HexStream() {
  const [values, setValues] = useState<string[] | null>(null);
  const count = 4;

  useEffect(() => {
    setValues(
      Array.from({ length: count }, () =>
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0"),
      ),
    );
    const id = setInterval(() => {
      setValues((prev) => {
        if (!prev) return null;
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        next[i] = Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0");
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  if (!values) return null;

  return (
    <span className="font-mono text-[10px] tracking-wider text-white/20">
      {values.join(" ")}
    </span>
  );
}

function TypeWriter() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let word = TYPING_WORDS[Math.floor(Math.random() * TYPING_WORDS.length)];
    let i = 0;
    let pause = 0;
    let erasing = false;

    const id = setInterval(() => {
      if (pause > 0) {
        pause--;
        return;
      }
      if (!erasing) {
        i++;
        setDisplay(word.slice(0, i));
        if (i >= word.length) {
          pause = 8;
          erasing = true;
        }
      } else {
        i--;
        setDisplay(word.slice(0, i));
        if (i <= 0) {
          word =
            TYPING_WORDS[Math.floor(Math.random() * TYPING_WORDS.length)];
          erasing = false;
          pause = 3;
        }
      }
    }, 150);

    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[10px] text-white/20">
      <span className="text-white/10">&gt; </span>
      {display}
      <span className="animate-pulse">_</span>
    </span>
  );
}

const TETROMINOES: [number, number][][] = [
  [[0, 0], [0, 1], [1, 0], [1, 1]],
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [0, 1], [0, 2], [1, 1]],
  [[0, 1], [0, 2], [1, 0], [1, 1]],
  [[0, 0], [0, 1], [1, 1], [1, 2]],
  [[0, 0], [0, 1], [0, 2], [1, 0]],
  [[0, 0], [0, 1], [0, 2], [1, 2]],
];

function Tetris({ rows = 8, cols = 5 }: { rows?: number; cols?: number }) {
  const [display, setDisplay] = useState<boolean[][] | null>(null);

  useEffect(() => {
    const emptyBoard = () =>
      Array.from({ length: rows }, () => Array<boolean>(cols).fill(false));

    const randomPiece = () => {
      const shape =
        TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
      const maxCol = Math.max(...shape.map(([, c]) => c));
      return {
        cells: shape,
        row: 0,
        col: Math.floor((cols - maxCol - 1) / 2),
      };
    };

    const fits = (
      board: boolean[][],
      cells: [number, number][],
      row: number,
      col: number,
    ) =>
      cells.every(([dr, dc]) => {
        const r = row + dr;
        const c = col + dc;
        return r >= 0 && r < rows && c >= 0 && c < cols && !board[r][c];
      });

    let board = emptyBoard();
    let piece = randomPiece();

    const render = () => {
      const d = board.map((r) => [...r]);
      for (const [dr, dc] of piece.cells) {
        const r = piece.row + dr;
        const c = piece.col + dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols) d[r][c] = true;
      }
      setDisplay(d);
    };
    render();

    const id = setInterval(() => {
      const lr = Math.random();
      if (lr < 0.3 && fits(board, piece.cells, piece.row, piece.col - 1)) {
        piece = { ...piece, col: piece.col - 1 };
      } else if (
        lr > 0.7 &&
        fits(board, piece.cells, piece.row, piece.col + 1)
      ) {
        piece = { ...piece, col: piece.col + 1 };
      }

      if (fits(board, piece.cells, piece.row + 1, piece.col)) {
        piece = { ...piece, row: piece.row + 1 };
      } else {
        for (const [dr, dc] of piece.cells) {
          const r = piece.row + dr;
          const c = piece.col + dc;
          if (r >= 0 && r < rows && c >= 0 && c < cols) board[r][c] = true;
        }
        board = board.filter((row) => !row.every(Boolean));
        while (board.length < rows) {
          board.unshift(Array<boolean>(cols).fill(false));
        }
        piece = randomPiece();
        if (!fits(board, piece.cells, piece.row, piece.col)) {
          board = emptyBoard();
        }
      }
      render();
    }, 400);

    return () => clearInterval(id);
  }, [rows, cols]);

  if (!display) return null;

  return (
    <div className="flex flex-col gap-[2px]">
      {display.map((row, r) => (
        <div key={r} className="flex gap-[2px]">
          {row.map((filled, c) => (
            <div
              key={c}
              className="size-[4px] rounded-[1px] bg-white transition-opacity duration-150"
              style={{ opacity: filled ? 0.35 : 0.03 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const PIXEL_ICONS: boolean[][][] = [
  // Next.js triangle
  [
    [false, false, true, false, false],
    [false, true, false, true, false],
    [false, true, false, true, false],
    [true, false, false, false, true],
    [true, true, true, true, true],
  ],
  // Abstract diamond
  [
    [false, false, true, false, false],
    [false, true, false, true, false],
    [true, false, false, false, true],
    [false, true, false, true, false],
    [false, false, true, false, false],
  ],
  // Git branch
  [
    [false, true, false, true, false],
    [false, true, false, true, false],
    [false, true, true, true, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
  ],
  // React atom
  [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [false, false, true, false, false],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  // TypeScript T
  [
    [true, true, true, true, true],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
  ],
];

function PixelIcon() {
  const [iconIdx, setIconIdx] = useState(-1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIconIdx(Math.floor(Math.random() * PIXEL_ICONS.length));
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIconIdx((i) => (i + 1) % PIXEL_ICONS.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  if (iconIdx < 0) return null;

  const icon = PIXEL_ICONS[iconIdx];

  return (
    <div
      className="flex flex-col gap-[3px] transition-opacity duration-500"
      style={{ opacity: visible ? 0.25 : 0 }}
    >
      {icon.map((row, r) => (
        <div key={r} className="flex gap-[3px]">
          {row.map((on, c) => (
            <div
              key={c}
              className="size-[4px] rounded-[1px] bg-white"
              style={{ opacity: on ? 1 : 0.1 }}
            />
          ))}
        </div>
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
  | { type: "matrix-rain" }
  | { type: "cursor-blink" }
  | { type: "hex-stream" }
  | { type: "type-writer" }
  | { type: "tetris" }
  | { type: "pixel-icon" }
  | { type: "dot" }
  | { type: "square" };

const CELL_CONTENTS: { col: number; row: number; content: CellContentType }[] = [
  { col: 3, row: 2, content: { type: "dot-matrix", offset: 0 } },
  { col: 7, row: 5, content: { type: "dot-matrix", offset: 5 } },
  { col: 9, row: 7, content: { type: "char-column" } },
  { col: 8, row: 1, content: { type: "pulse-grid", phase: 0 } },
  { col: 9, row: 6, content: { type: "signal-bars" } },
  { col: 1, row: 3, content: { type: "spinner" } },
  { col: 2, row: 9, content: { type: "orbit" } },
  { col: 4, row: 5, content: { type: "life-grid" } },
  { col: 1, row: 7, content: { type: "waveform" } },
  { col: 2, row: 1, content: { type: "fade-chain", phase: 0 } },
  { col: 7, row: 3, content: { type: "breathe" } },
  { col: 9, row: 3, content: { type: "bar-code" } },
  { col: 4, row: 9, content: { type: "bar-code" } },
  { col: 3, row: 12, content: { type: "matrix-rain" } },
  { col: 6, row: 7, content: { type: "cursor-blink" } },
  { col: 3, row: 10, content: { type: "hex-stream" } },
  { col: 8, row: 2, content: { type: "type-writer" } },
  { col: 9, row: 5, content: { type: "tetris" } },
  { col: 1, row: 12, content: { type: "tetris" } },
  { col: 3, row: 14, content: { type: "pixel-icon" } },
  { col: 9, row: 9, content: { type: "pixel-icon" } },
  { col: 7, row: 6, content: { type: "fade-chain", phase: 3 } },
  { col: 4, row: 4, content: { type: "dot" } },
  { col: 6, row: 2, content: { type: "square" } },
  { col: 6, row: 11, content: { type: "square" } },
  { col: 8, row: 4, content: { type: "dot" } },
  { col: 1, row: 13, content: { type: "dot" } },
  { col: 8, row: 14, content: { type: "breathe" } },
  { col: 6, row: 10, content: { type: "spinner" } },
  { col: 2, row: 8, content: { type: "dot" } },
];

const ALL_MARGIN_CELLS: { col: number; row: number }[] = [];
for (let row = 1; row <= TOTAL_ROWS; row++) {
  for (let col = 1; col <= TOTAL_COLS; col++) {
    if (col !== CENTER_COL) ALL_MARGIN_CELLS.push({ col, row });
  }
}

const CONTENT_GENERATORS: (() => CellContentType)[] = [
  () => ({ type: "dot-matrix", offset: Math.floor(Math.random() * 15) }),
  () => ({ type: "char-column" }),
  () => ({ type: "pulse-grid", phase: Math.floor(Math.random() * 10) }),
  () => ({ type: "signal-bars" }),
  () => ({ type: "spinner" }),
  () => ({ type: "orbit" }),
  () => ({ type: "life-grid" }),
  () => ({ type: "waveform" }),
  () => ({ type: "fade-chain", phase: Math.floor(Math.random() * 6) }),
  () => ({ type: "breathe" }),
  () => ({ type: "bar-code" }),
  () => ({ type: "matrix-rain" }),
  () => ({ type: "cursor-blink" }),
  () => ({ type: "hex-stream" }),
  () => ({ type: "type-writer" }),
  () => ({ type: "tetris" }),
  () => ({ type: "pixel-icon" }),
  () => ({ type: "dot" }),
  () => ({ type: "square" }),
];

function randomContent(): CellContentType {
  return CONTENT_GENERATORS[
    Math.floor(Math.random() * CONTENT_GENERATORS.length)
  ]();
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
    case "matrix-rain": {
      const r = matrixRainRows(rowHeight);
      return <MatrixRain rows={r} />;
    }
    case "cursor-blink":
      return <CursorBlink />;
    case "hex-stream":
      return <HexStream />;
    case "type-writer":
      return <TypeWriter />;
    case "tetris": {
      const size = tetrisBoardSize(rowHeight);
      return <Tetris rows={size.rows} cols={size.cols} />;
    }
    case "pixel-icon":
      return <PixelIcon />;
    case "dot":
      return <div className="size-[3px] rounded-full bg-white/10" />;
    case "square":
      return <div className="size-2 rounded-[1px] bg-white/[0.06]" />;
  }
}

export function GridBackground() {
  const [placements, setPlacements] = useState(() =>
    CELL_CONTENTS.map(({ col, row, content }) => ({
      col,
      row,
      content,
      visible: true,
    })),
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let first = true;

    function scheduleNext() {
      const delay = first
        ? 3000 + Math.floor(Math.random() * 3000)
        : 4000 + Math.floor(Math.random() * 4000);
      first = false;

      timer = setTimeout(() => {
        const count = 3 + Math.floor(Math.random() * 4);

        setPlacements((prev) => {
          const indices = [...Array(prev.length).keys()];
          for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
          }
          const toFade = new Set(
            indices.slice(0, Math.min(count, prev.length)),
          );
          return prev.map((p, i) =>
            toFade.has(i) ? { ...p, visible: false } : p,
          );
        });

        setTimeout(() => {
          setPlacements((prev) => {
            const next = [...prev];
            const fadedIndices: number[] = [];
            for (let i = 0; i < next.length; i++) {
              if (!next[i].visible) fadedIndices.push(i);
            }
            const occupied = new Set(
              next
                .filter((_, i) => !fadedIndices.includes(i))
                .map((p) => `${p.col},${p.row}`),
            );

            const available = ALL_MARGIN_CELLS.filter(
              (c) => !occupied.has(`${c.col},${c.row}`),
            );
            for (let i = available.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [available[i], available[j]] = [available[j], available[i]];
            }

            for (
              let k = 0;
              k < fadedIndices.length && k < available.length;
              k++
            ) {
              const idx = fadedIndices[k];
              const cell = available[k];
              next[idx] = {
                col: cell.col,
                row: cell.row,
                content: randomContent(),
                visible: false,
              };
            }
            return next;
          });
        }, 800);

        setTimeout(() => {
          setPlacements((prev) =>
            prev.map((p) => (p.visible ? p : { ...p, visible: true })),
          );
        }, 1000);

        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  const contentMap = useMemo(() => {
    const map = new Map<
      string,
      { content: CellContentType; visible: boolean }
    >();
    for (const p of placements) {
      map.set(`${p.col},${p.row}`, {
        content: p.content,
        visible: p.visible,
      });
    }
    return map;
  }, [placements]);

  return (
    <div
      className="pointer-events-none fixed inset-0 hidden overflow-hidden xl:grid"
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
        const entry =
          row <= TOTAL_ROWS && col !== CENTER_COL
            ? contentMap.get(`${col},${row}`)
            : undefined;

        return (
          <div
            key={i}
            className="flex items-center justify-center overflow-hidden bg-black p-2"
          >
            {entry && (
              <div
                className="transition-opacity duration-700"
                style={{ opacity: entry.visible ? 1 : 0 }}
              >
                <CellContent content={entry.content} rowHeight={rowHeight} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
