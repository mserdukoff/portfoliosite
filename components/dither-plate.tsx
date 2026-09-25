"use client";

import { Dithering, ImageDithering } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Shader uniforms take literal colors, not CSS variables. Keep in sync with :root.
export const ink = {
  paper: "#edeef6",
  wash: "#c7ccee",
  cobalt: "#2a44b8",
  deep: "#13205e",
};

export function DitherField({
  className,
  shape = "warp",
  colorFront = ink.wash,
  colorBack = ink.paper,
  size = 2,
  speed = 0.18,
  scale = 1,
}: {
  className?: string;
  shape?: "simplex" | "warp" | "dots" | "wave" | "ripple" | "swirl" | "sphere";
  colorFront?: string;
  colorBack?: string;
  size?: number;
  speed?: number;
  scale?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <Dithering
      aria-hidden
      className={cn("absolute inset-0", className)}
      colorBack={colorBack}
      colorFront={colorFront}
      shape={shape}
      type="4x4"
      size={size}
      scale={scale}
      speed={reduced ? 0 : speed}
      frame={12_000}
    />
  );
}

export function DitherBust({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_60%,black_30%,transparent_72%)]">
        <DitherField shape="warp" scale={0.7} />
      </div>
      <ImageDithering
        role="img"
        aria-label="Portrait of Matt Serdukoff"
        className="absolute inset-0"
        image="/portrait-soft.png"
        fit="contain"
        scale={1}
        colorFront={ink.deep}
        colorBack="#00000000"
        colorHighlight={ink.paper}
        type="4x4"
        size={2}
        colorSteps={2}
        inverted
        speed={0}
      />
    </div>
  );
}
