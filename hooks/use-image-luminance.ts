import { useState, useEffect } from "react";

/**
 * Calculates the average luminance of an image and returns an appropriate opacity
 * for ambient glow effects. Dark images get higher opacity, bright images get lower.
 */
export function useImageLuminance(url: string) {
  const [opacity, setOpacity] = useState({ light: 0.3, dark: 0.2 });

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Sample the image at a reasonable resolution
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);

      const imageData = ctx.getImageData(0, 0, 100, 100);
      const data = imageData.data;
      let totalLuminance = 0;
      let count = 0;

      // Calculate average luminance using relative luminance formula
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];

        // Skip transparent pixels
        if (alpha < 10) continue;

        // Calculate relative luminance (0-255 scale, but we'll normalize)
        // Using the standard formula: 0.299*R + 0.587*G + 0.114*B
        const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        totalLuminance += luminance;
        count++;
      }

      if (count === 0) {
        setOpacity({ light: 0.3, dark: 0.2 });
        return;
      }

      const avgLuminance = totalLuminance / count; // 0-1 scale

      // Dynamic opacity calculation:
      // Dark images (low luminance) → higher opacity for visibility
      // Bright images (high luminance) → lower opacity to prevent overpowering

      // For light mode: base opacity range 0.15-0.5
      // For dark mode: base opacity range 0.1-0.35
      // Invert the relationship: lower luminance = higher opacity
      const lightOpacity = 0.5 - (avgLuminance * 0.35); // 0.15 to 0.5
      const darkOpacity = 0.35 - (avgLuminance * 0.25); // 0.1 to 0.35

      // Clamp values to reasonable ranges
      const clampedLight = Math.max(0.15, Math.min(0.5, lightOpacity));
      const clampedDark = Math.max(0.1, Math.min(0.35, darkOpacity));

      setOpacity({
        light: clampedLight,
        dark: clampedDark,
      });
    };

    img.onerror = () => {
      // Fallback to default opacity on error
      setOpacity({ light: 0.3, dark: 0.2 });
    };
  }, [url]);

  return opacity;
}
