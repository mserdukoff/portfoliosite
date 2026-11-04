"use client";

import { motion } from "motion/react";
import { fadeUp, fadeUpStill, useStillMotion } from "@/lib/motion";

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const still = useStillMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={still ? fadeUpStill : fadeUp}
    >
      {children}
    </motion.div>
  );
}
