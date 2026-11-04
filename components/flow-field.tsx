"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Vortex = readonly [x: number, y: number, strength: number, radius: number];

type Preset = {
  seed: number;
  background: string;
  fade: string;
  density: number;
  life: number;
  warmup: number;
  lineWidth: number;
  drift: readonly [number, number];
  vortices: readonly Vortex[];
  /** Line colors, slowest current first. */
  currents: readonly string[];
  speeds: readonly number[];
};

export const presets = {
  neon: {
    seed: 7,
    background: "#03060a",
    fade: "rgba(3,6,10,.022)",
    density: 120,
    life: 190,
    warmup: 230,
    lineWidth: 0.6,
    drift: [0.6, -0.1],
    vortices: [
      [0.72, 0.16, 3.2, 0.12],
      [0.37, 0.48, -2.6, 0.12],
      [0.6, 0.45, 2.2, 0.16],
      [0.38, 0.88, 2.8, 0.1],
      [0.05, 0.2, -2, 0.1],
      [0.9, 0.85, -2, 0.12],
    ],
    currents: [
      "rgba(30,90,190,.17)",
      "rgba(35,190,195,.17)",
      "rgba(255,170,60,.12)",
      "rgba(255,85,25,.27)",
    ],
    speeds: [0.9, 1.5, 2.3],
  },
} satisfies Record<string, Preset>;

const MAX_PARTICLES = 7000;
const MIN_PARTICLES = 1800;
const PARTICLES_PER_STRAND = 32;
const STRAND_SCATTER = 7;
const SLOW_STEP_MS = 9;
const FRAME_MS = 33;
const WARMUP_STRIDE = 3;
const WARMUP_ALPHA = 0.62;

function random(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

/**
 * A particle field advected through a few vortices. Particles start from a
 * limited set of strands rather than uniformly, so they gather into ribbons with
 * dark water between them. Lines are batched by color into one path per current,
 * which is what keeps thousands of them cheap.
 */
export function FlowField({
  preset,
  className,
}: {
  preset: keyof typeof presets;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;
    const stage = canvas;
    const ctx = context;
    const host = stage.parentElement ?? stage;
    const opt: Preset = presets[preset];
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let onScreen = true;
    let width = 0;
    let height = 0;
    let last = 0;
    let warm = 0;
    let tick = 0;
    let settled = false;
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let ages = new Float32Array(0);
    let bias = new Float32Array(0);
    let live = 0;
    let slowSteps = 0;
    let strands: { x: number; y: number; bias: number }[] = [];
    let rand = random(opt.seed);
    let swirls: { x: number; y: number; s: number; k: number }[] = [];
    const stir = { x: 0, y: 0, power: 0 };
    let velX = 0;
    let velY = 0;

    function sampleField(px: number, py: number) {
      velX = opt.drift[0];
      velY = opt.drift[1];
      for (const v of swirls) {
        const dx = px - v.x;
        const dy = py - v.y;
        const f = (v.s * v.k) / (dx * dx + dy * dy + v.k * v.k);
        velX -= dy * f;
        velY += dx * f;
      }
      if (stir.power > 0.01) {
        const dx = px - stir.x;
        const dy = py - stir.y;
        const k = 90;
        const f = (3.4 * stir.power * k) / (dx * dx + dy * dy + k * k);
        velX -= dy * f;
        velY += dx * f;
      }
      velX += Math.sin(py * 0.008 + px * 0.003) * 0.35;
      velY += Math.cos(px * 0.007 - py * 0.002) * 0.35;
    }

    function respawn(i: number) {
      const strand = strands[Math.floor(rand() * strands.length)];
      xs[i] = strand.x + (rand() - 0.5) * STRAND_SCATTER * 2;
      ys[i] = strand.y + (rand() - 0.5) * STRAND_SCATTER * 2;
      ages[i] = opt.life * (0.4 + rand() * 0.6);
      bias[i] = strand.bias + (rand() - 0.5) * 0.35;
    }

    function step(stride = 1) {
      const paths = opt.currents.map(() => new Path2D());
      for (let i = 0; i < live; i++) {
        const x = xs[i];
        const y = ys[i];
        sampleField(x, y);
        const speed = Math.hypot(velX, velY);
        const pace = 1.4 * stride;
        const nx = x + velX * pace;
        const ny = y + velY * pace;
        const felt = speed + bias[i];
        let band = 0;
        while (band < opt.speeds.length && felt > opt.speeds[band]) band++;
        const path = paths[band];
        path.moveTo(x, y);
        path.lineTo(nx, ny);
        xs[i] = nx;
        ys[i] = ny;
        ages[i] -= stride;
        if (ages[i] < 0 || nx < 0 || ny < 0 || nx > width || ny > height) {
          respawn(i);
        }
      }
      paths.forEach((path, i) => {
        if (!opt.currents[i]) return;
        ctx.strokeStyle = opt.currents[i];
        ctx.stroke(path);
      });
    }

    function rebuild() {
      const rect = stage.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width < 1 || height < 1) return;
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      stage.width = Math.round(width * dpr);
      stage.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = opt.background;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = opt.lineWidth;

      rand = random(opt.seed);
      const count = Math.min(MAX_PARTICLES, Math.round((width * height) / opt.density));
      xs = new Float32Array(count);
      ys = new Float32Array(count);
      ages = new Float32Array(count);
      bias = new Float32Array(count);
      live = count;
      slowSteps = 0;
      const span = Math.min(width, height);
      swirls = opt.vortices.map(([x, y, s, k]) => ({
        x: x * width,
        y: y * height,
        s,
        k: k * span,
      }));
      strands = Array.from(
        { length: Math.max(24, Math.round(count / PARTICLES_PER_STRAND)) },
        () => ({
          x: rand() * width,
          y: rand() * height,
          bias: (rand() - 0.5) * 2.2,
        })
      );
      for (let i = 0; i < count; i++) {
        respawn(i);
        ages[i] = rand() * opt.life;
      }
      warm = 0;
      settled = false;
      start();
    }

    function frame(now: number) {
      raf = 0;
      if (!onScreen || document.hidden) return;

      if (warm < opt.warmup) {
        // Bloom in over a few frames instead of blocking the first paint. Longer
        // strides draw the same ribbons in a third of the work.
        const budget = performance.now() + 12;
        ctx.globalAlpha = WARMUP_ALPHA;
        do {
          step(WARMUP_STRIDE);
          warm += WARMUP_STRIDE;
        } while (warm < opt.warmup && performance.now() < budget);
        ctx.globalAlpha = 1;
      } else if (still) {
        settled = true;
        return;
      } else if (now - last >= FRAME_MS) {
        last = now;
        tick++;
        stir.power *= 0.97;
        if (tick % 4 === 0) {
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = opt.fade;
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = "lighter";
        }
        const began = performance.now();
        step();
        // Shed particles rather than drop frames on slower machines.
        slowSteps = performance.now() - began > SLOW_STEP_MS ? slowSteps + 1 : 0;
        if (slowSteps >= 12) {
          live = Math.max(MIN_PARTICLES, Math.round(live * 0.7));
          slowSteps = 0;
        }
      }
      start();
    }

    function start() {
      if (!raf && !settled && onScreen) raf = requestAnimationFrame(frame);
    }

    const resize = new ResizeObserver(() => {
      const rect = stage.getBoundingClientRect();
      // Phone URL bars change the height on scroll; don't restart for that.
      if (Math.abs(rect.width - width) > 1 || Math.abs(rect.height - height) > 140) {
        rebuild();
      }
    });
    resize.observe(stage);

    const visible = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      start();
    });
    visible.observe(stage);

    const wake = () => start();
    document.addEventListener("visibilitychange", wake);

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      stir.x = event.clientX - rect.left;
      stir.y = event.clientY - rect.top;
      stir.power = 1;
    };
    if (!still) host.addEventListener("pointermove", onPointer, { passive: true });

    rebuild();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      visible.disconnect();
      document.removeEventListener("visibilitychange", wake);
      host.removeEventListener("pointermove", onPointer);
    };
  }, [preset]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 block size-full", className)}
    />
  );
}
