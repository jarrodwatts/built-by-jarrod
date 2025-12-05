"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Twitter, Linkedin, Youtube, Music } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-background/5 backdrop-blur-xl" : "bg-transparent"
        }`}
    >
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/jarrod.jpg"
            alt="Jarrod"
            className="size-5 rounded-full object-cover"
          />
          <span className="text-sm font-medium tracking-tight">Jarrod</span>
        </Link>

        {/* Right: Social Icons */}
        <nav className="flex items-center gap-1">
          <a
            href="https://github.com/jarrodwatts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://twitter.com/jarrodwatts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter className="size-4" />
          </a>
          <a
            href="https://au.linkedin.com/in/jarrodwatts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="https://youtube.com/@jarrodwatts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            aria-label="YouTube"
          >
            <Youtube className="size-4" />
          </a>

        </nav>
      </div>
    </header>
  );
}
