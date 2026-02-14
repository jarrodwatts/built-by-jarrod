"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextScramble } from "@/components/ui/text-scramble";

const SCRAMBLE_CHARS = "!@#$%&*_+-=<>[]{}|/\\?~0123456789";

export function BrandMark() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const [trigger, setTrigger] = useState(true);

  const prefix =
    segments.length === 0
      ? "~/"
      : `~/jw/${segments.slice(0, -1).map((s) => `${s}/`).join("")}`;
  const active = segments.length === 0 ? "jw" : segments[segments.length - 1];

  useEffect(() => {
    setTrigger(true);
  }, [pathname]);

  return (
    <Link
      href="/"
      className="group font-mono text-sm"
      onMouseEnter={() => setTrigger(true)}
    >
      <span className="text-neutral-600 transition-colors group-hover:text-white">
        {prefix}
      </span>
      <TextScramble
        as="span"
        className="text-neutral-400 transition-colors group-hover:text-white"
        trigger={trigger}
        speed={0.04}
        duration={0.8}
        characterSet={SCRAMBLE_CHARS}
        onScrambleComplete={() => setTrigger(false)}
      >
        {active}
      </TextScramble>
    </Link>
  );
}
