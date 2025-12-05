import { useState, useEffect } from "react";

export function useImageColor(url: string, defaultColor = "transparent") {
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Resize image to speed up processing
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);

      const imageData = ctx.getImageData(0, 0, 50, 50);
      const data = imageData.data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];

        // Ignore transparent pixels
        if (alpha < 10) continue;

        // Calculate brightness (luminance)
        const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

        // Ignore very dark pixels (backgrounds)
        if (brightness < 20) continue;

        // Ignore very light pixels (white text/bg)
        if (brightness > 230) continue;

        // Calculate saturation to avoid grays
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const saturation = max === 0 ? 0 : (max - min) / max;

        // Ignore low saturation (gray/white/black)
        if (saturation < 0.2) continue;

        r += red;
        g += green;
        b += blue;
        count++;
      }

      if (count > 0) {
        setColor(`rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`);
      }
    };
  }, [url]);

  return color;
}
