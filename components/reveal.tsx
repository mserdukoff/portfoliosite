"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/motion";

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}
