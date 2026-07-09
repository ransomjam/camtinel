"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
};

export const Reveal = forwardRef<HTMLDivElement, Props>(function Reveal(
  { children, delay = 0, y = 12, once = true, className },
  ref,
) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-64px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
});
