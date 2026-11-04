"use client";

import { useEffect, useRef } from "react";

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function random(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

const terrain: Draw = (ctx, w, h) => {
  const rand = random(3);
  ctx.strokeStyle = "#cfd8de";
  ctx.lineWidth = 0.5;
  for (let ridge = 0; ridge < 22; ridge++) {
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const u = i / 60;
      const y =
        h * 0.88 -
        ridge * (h / 42) -
        Math.exp(-((u - 0.5) ** 2) / 0.03) * h * 0.52 * (1 - ridge / 30) -
        Math.sin(u * 14 + ridge) * 3 * rand();
      if (i) ctx.lineTo(u * w, y);
      else ctx.moveTo(u * w, y);
    }
    ctx.globalAlpha = 0.25 + ridge / 40;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
};

const retrieval: Draw = (ctx, w, h) => {
  const rand = random(5);
  const query = [w * 0.52, h * 0.5];
  const near = (p: number[]) => Math.hypot(p[0] - query[0], p[1] - query[1]);
  const points = Array.from({ length: 70 }, () => [
    w * 0.08 + rand() * w * 0.84,
    h * 0.1 + rand() * h * 0.8,
  ]).sort((a, b) => near(a) - near(b));
  points.forEach((point, i) => {
    const hit = i < 6;
    if (hit) {
      ctx.strokeStyle = "rgba(255,90,31,.65)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(query[0], query[1]);
      ctx.lineTo(point[0], point[1]);
      ctx.stroke();
    }
    ctx.fillStyle = hit ? "#ff5a1f" : "rgba(190,215,230,.55)";
    ctx.fillRect(point[0] - 1, point[1] - 1, 2, 2);
  });
  ctx.beginPath();
  ctx.arc(query[0], query[1], 3.5, 0, 7);
  ctx.fillStyle = "#e8eef2";
  ctx.fill();
  ctx.font = "8px var(--font-jetbrains), monospace";
  ctx.fillStyle = "#93a3af";
  ctx.fillText("top-k = 6", 6, h - 6);
};

// Equirectangular land, one row per line. Coarse on purpose: it only has to
// read as the world once it is a dot matrix.
const LAND = [
  "                             #####                           ",
  "    ###### ####  ##         ######       ##     #########    ",
  "  ################# ##      #####     #  ### ################",
  " ###################  ##     ###      ### ###################",
  "     ################ ###            ########################",
  "      ###############  #             ########################",
  "       ##############               ##### ###################",
  "        ############               ### ###################   ",
  "        ###########                ### ##################    ",
  "         #######                 ######################  #   ",
  "          ####                  ########  ############       ",
  "           ###  ##              ##########  ### ####  ##     ",
  "             ##                 ###########  ##  ###   #     ",
  "              #####                ########  #    ##  ##     ",
  "              ########              ######       ##  ###     ",
  "              #########              ####         # # ##     ",
  "               #######               ####            ##      ",
  "                ######               ####         ###  #     ",
  "                #####                ###         ######      ",
  "                ####                  #          ######      ",
  "                ###                               ###   #    ",
  "                ##                                       #   ",
  "                #                                            ",
];

const world: Draw = (ctx, w, h) => {
  const rand = random(9);
  ctx.fillStyle = "#06121c";
  ctx.fillRect(0, 0, w, h);
  const rows = LAND.length;
  const cols = LAND[0].length;
  for (let y = 3; y < h; y += 4) {
    for (let x = 3; x < w; x += 4) {
      const row = LAND[Math.floor((y / h) * rows)];
      if (row?.[Math.floor((x / w) * cols)] !== "#") continue;
      ctx.fillStyle = rand() < 0.05 ? "#ffd27a" : "#2a8fd0";
      ctx.fillRect(x, y, 2, 2);
    }
  }
};

const drawings = { terrain, retrieval, world };

export function Specimen({ kind }: { kind: keyof typeof drawings }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const paint = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawings[kind](ctx, width, height);
    };
    const observer = new ResizeObserver(paint);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [kind]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="block h-[6.875rem] w-full border-t border-border"
    />
  );
}
