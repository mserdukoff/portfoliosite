import { useSyncExternalStore } from "react";
import type { Transition, Variants } from "motion/react";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Like motion's useReducedMotion, but false until hydration finishes, so
 * anything it decides at render time matches the server's HTML.
 */
export function useStillMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false
  );
}

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const fadeUpStill: Variants = {
  hidden: fadeUp.hidden,
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};
