type Edges = { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean };

function prng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A clip-path polygon whose chosen edges look hand-torn. Seeded, so the
 * server and client render the same shape.
 */
export function torn(seed: number, edges: Edges, depth = 1.4, steps = 36) {
  const rand = prng(seed);
  const jitter = () => (rand() * 0.7 + rand() * 0.3) * depth;
  const fmt = (x: number, y: number) => `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  const points: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 100;
    points.push(fmt(t, edges.top ? jitter() : 0));
  }
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * 100;
    points.push(fmt(edges.right ? 100 - jitter() : 100, t));
  }
  for (let i = steps - 1; i >= 0; i--) {
    const t = (i / steps) * 100;
    points.push(fmt(t, edges.bottom ? 100 - jitter() : 100));
  }
  for (let i = steps - 1; i >= 1; i--) {
    const t = (i / steps) * 100;
    points.push(fmt(edges.left ? jitter() : 0, t));
  }

  return `polygon(${points.join(", ")})`;
}
