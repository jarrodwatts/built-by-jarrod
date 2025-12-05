"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useImageLuminance } from "@/hooks/use-image-luminance";
import { useEffect, useRef, useState } from "react";

export function ProjectCard({
  title,
  href,
  image,
  tags,
  description,
}: {
  title: string;
  href: string;
  image: string;
  tags: string[];
  description: string;
}) {
  const { light, dark } = useImageLuminance(image);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Calculate hover opacity (slightly more intense)
  const hoverLight = Math.min(1, light * 1.5);
  const hoverDark = Math.min(0.5, dark * 1.5);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!glowRef.current) return;

    // Determine current opacity based on dark mode and hover state
    let opacity: number;
    if (isHovered) {
      opacity = isDark ? hoverDark : hoverLight;
    } else {
      opacity = isDark ? dark : light;
    }

    glowRef.current.style.opacity = opacity.toString();
  }, [isHovered, isDark, light, dark, hoverLight, hoverDark]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border border-border text-left transition-all hover:border-muted-foreground/50 hover:shadow-lg hover:shadow-black/5 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Glow - dynamically adjusted based on image brightness */}
      <div
        ref={glowRef}
        className="absolute inset-0 -z-30 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) saturate(2)",
          opacity: light, // Initial opacity
        }}
      />

      {/* Card Content */}
      <div className="flex flex-col h-full rounded-2xl relative z-10">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content - transparent background to show glow bleed */}
        <div className="flex flex-col gap-3 p-5 bg-transparent">
          {/* Title with arrow */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-white">{title}</h3>
            <ArrowUpRight className="size-5 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
