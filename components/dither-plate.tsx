"use client";

import { ImageDithering } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

// Shader uniforms take literal colors, not CSS variables.
export function DitherBust({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <ImageDithering
        role="img"
        aria-label="Portrait of Matt Serdukoff"
        className="absolute inset-0"
        image="/portrait-soft.png"
        fit="contain"
        scale={1}
        colorFront="#e8eef2"
        colorBack="#00000000"
        colorHighlight="#2ec4c4"
        type="4x4"
        size={2}
        colorSteps={2}
        speed={0}
      />
    </div>
  );
}
